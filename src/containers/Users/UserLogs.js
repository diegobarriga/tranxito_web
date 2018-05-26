import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Table, Badge } from 'reactstrap';
import Loader from '../../components/Loader/Loader';
import * as actions from '../../store/actions/userLogs';
import { EVENT_TYPES, EVENT_CODES, DUTY_STATUS, COLORS } from '../../utils/eventTypes';

const moment = require('moment');

const styles = {
  userLogsContainer: {
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
    return (
      <Container style={styles.userLogsContainer}>
        <Table striped>
          <thead>
            <tr>
              <th>Event</th>
              <th>Detail</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {this.props.logs.map(event => (
              <tr key={event.id}>
                <td>{event.event_type === 1 &&
                  <Badge color={COLORS[event.event_code]} style={styles.badge}>
                    {DUTY_STATUS[event.event_code]}
                  </Badge>}
                  {'  '}{EVENT_TYPES[event.event_type]}
                </td>
                <td>{EVENT_CODES[event.event_type][event.event_code]}</td>
                <td>{this.formatDate(event.event_timestamp)}</td>
              </tr>

                  ))}
          </tbody>
        </Table>
      </Container>

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
