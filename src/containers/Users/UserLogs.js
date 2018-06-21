import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Table, Badge } from 'reactstrap';
import { translate } from 'react-i18next';
import Loader from '../../components/Loader/Loader';
import * as actions from '../../store/actions/userLogs';
import { EVENT_TYPES, EVENT_CODES, DUTY_STATUS } from '../../utils/eventTypes';
import '../../assets/styles/buttons.css';

const moment = require('moment');

const styles = {
  tableStyle: {
    maxHeight: `${50 * 6}px`,
    overflow: 'scroll',
  },
  badge: {
    width: '40px',
  },
};

class UserLogs extends React.Component {
  componentDidMount() {
    this.props.getUserLogs(this.props.token, this.props.id);
  }

  formatDate(datetime) {
    return moment(datetime).calendar();
  }

  render() {
    if (this.props.logs == null) return <Loader />;
    this.props.logs.reverse();
    const { t } = this.props;
    return (
      <Row>
        <Col sm="12" md={{ size: 12 }}>
          <Table striped>
            <thead>
              <tr>
                <th>{t('Event')}</th>
                <th>{t('Detail')}</th>
                <th>{t('Timestamp')}</th>
              </tr>
            </thead>
            <tbody>
              {this.props.logs.map(event => (
                <tr key={event.id}>
                  <td>{event.type === 1 &&
                    <Badge className={`event${event.code}`} style={styles.badge}>
                      {DUTY_STATUS[event.code]}
                    </Badge>}
                    {'  '}{EVENT_TYPES[event.type]}
                  </td>
                  <td>{EVENT_CODES[event.type][event.code]}</td>
                  <td>{this.formatDate(event.timestamp)}</td>
                </tr>

                    ))}
            </tbody>
          </Table>
        </Col>
      </Row>

    );
  }
}

UserLogs.propTypes = {
  getUserLogs: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  logs: PropTypes.array,
  t: PropTypes.isRequired,
};

UserLogs.defaultProps = {
  logs: null,
};

const mapStateToProps = state => ({
  token: state.auth.token,
  loading: state.userLogs.loading,
  logs: state.userLogs.logs,
});

const mapDispatchToProps = dispatch => ({
  getUserLogs: (token, UserId) => dispatch(actions.getUserLogs(token, UserId)),
});
const translateFunc = translate('translations')(UserLogs);
export default connect(mapStateToProps, mapDispatchToProps)(translateFunc);
