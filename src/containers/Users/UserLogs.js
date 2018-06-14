import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Row, Col, Table, Badge } from 'reactstrap';
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
  constructor(props) {
    super(props);
    this.state = {
      logs: null,
      selectedSortId: null,
      selectedTypeSort: null,
    };
    this.sortByColumnUp = this.sortByColumnUp.bind(this);
    this.sortByColumnDown = this.sortByColumnDown.bind(this);
  }

  async componentDidMount() {
    await this.props.getUserLogs(this.props.token, this.props.id);
    this.setState({ logs: this.props.logs });
  }

  formatDate(datetime) {
    return moment(datetime).calendar();
  }

  sortByColumnDown() {
    const { logs } = this.state;

    logs.sort((a, b) => a.event_timestamp - b.event_timestamp);
    this.setState({ logs, selectedSortId: '1', selectedTypeSort: '0' });
  }

  sortByColumnUp() {
    const { logs } = this.state;

    logs.sort((a, b) => b.event_timestamp - a.event_timestamp);
    this.setState({ logs, selectedSortId: '1', selectedTypeSort: '1' });
  }

  render() {
    if (this.state.logs == null) return <Loader />;
    this.props.logs.reverse();
    return (
      <Row>
        <Col sm="12" md={{ size: 12 }}>
          <Table striped>
            <thead>
              <tr>
                <th>Event</th>
                <th>Detail</th>
                <th>
                  Timestamp
                  <button onClick={() => this.sortByColumnDown()} className="default">
                    <FontAwesomeIcon
                      icon="sort-numeric-down"
                      className={(this.state.selectedSortId === '3' && this.state.selectedTypeSort === '0') ? 'green_icon' : ''}
                    />
                  </button>
                  <button onClick={() => this.sortByColumnUp()} className="default">
                    <FontAwesomeIcon
                      icon="sort-numeric-up"
                      className={(this.state.selectedSortId === '3' && this.state.selectedTypeSort === '1') ? 'green_icon' : ''}
                    />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.logs.map(event => (
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

export default connect(mapStateToProps, mapDispatchToProps)(UserLogs);
