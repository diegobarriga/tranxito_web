import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ListGroup, ListGroupItem, Container, Table } from 'reactstrap';
import Aux from '../../hoc/Aux';
import Loader from '../../components/Loader/Loader';
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

    this.state = {
      user: undefined,
      loading: true,
    };
  }

  async componentWillMount() {
    try {
      const response = await axios.get(`https://private-8f8d7c-elde2e.apiary-mock.com/drivers_and_events/${this.props.id}`);
      const user = response.data;
      this.setState({ user, loading: false });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    if (this.state.loading) return <Aux><Loader /></Aux>;
    const { user } = this.state;
    const { events } = user;
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
                  {events.map(event => (
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
export default UserLogs;
