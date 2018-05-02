import React from 'react';
import { Link } from 'react-router-dom';
import { Bar, Line, Pie } from 'react-chartjs-2';
import axios from 'axios';
import { ListGroup, ListGroupItem, Button, Row, Col, Container, Table } from 'reactstrap';
import Aux from '../../hoc/Aux';
import Avatar from '../../components/Avatar';
import Graph from './graph';
import Loader from '../../components/Loader/Loader';
import { EVENT_TYPES, EVENT_CODES } from '../../utils/eventTypes';

const styles = {
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: '24px 12px',
  },
  userData: {
    flexDirection: 'column',
    marginLeft: '12px',
  },
  userLogsContainer: {
    maxHeight: `${50 * 6}px`,
    overflow: 'scroll',
  },
};

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
      loading: true,
    };
  }

  async componentWillMount() {
    const { id } = this.props.match.params;
    try {
      const response = await axios.get(`https://private-8f8d7c-elde2e.apiary-mock.com/drivers_and_events/${id}`);
      console.log(response);
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
      <Container>

        <h1>{`${user.first_name} ${user.last_name}`}</h1>
        <Row style={styles.userProfile}>
          <Avatar src={user.picture} />
          <div style={styles.userData}>
            <div>Driver license number: {user.driver_license_number}</div>
            <div>Email: {user.email}</div>
          </div>
        </Row>

        <Graph />
        <br />
        <Row style={styles.userLogsContainer}>
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
        </Row>
      </Container>

    );
  }
}

export default Users;
