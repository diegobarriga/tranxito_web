import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ListGroup, ListGroupItem, Container, Table } from 'reactstrap';
import Aux from '../../hoc/Aux';
import Loader from '../../components/Loader/Loader';
import * as actions from '../../store/actions/user-logs';
import { connect } from 'react-redux';
import { EVENT_TYPES, EVENT_CODES } from '../../utils/eventTypes';

const styles = {
  userLogsContainer: {
    maxHeight: `${50 * 6}px`,
    overflow: 'scroll',
  },
};


class UserLogs extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUserLogs(this.props.token, this.props.id);
  }

  render() {
    if (this.props.logs == null) return <Loader />;
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
                      <td>{EVENT_TYPES[event.event_type]}</td>
                      <td>{EVENT_CODES[event.event_type][event.event_code]}</td>
                      <td>{event.event_timestamp}</td>
                    </tr>

                  ))}
                </tbody>
              </Table>
        </Container>

      );
    }
  }


  const mapStateToProps = state => {
      return {
          token: state.auth.token,
          loading: state.userLogs.loading,
          logs: state.userLogs.logs,
      };
  };

  const mapDispatchToProps = dispatch => {
      return {
          getUserLogs: ( token, UserId ) => dispatch(actions.getUserLogs(token, UserId))
      }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(UserLogs);
