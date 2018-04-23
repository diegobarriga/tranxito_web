import React from 'react';
import { Link } from 'react-router-dom'
import { ListGroup, ListGroupItem, Button, Row, Col, Container } from 'reactstrap';
import Aux from '../../hoc/Aux';
import UserRow from './User-row'


class UsersInfo extends React.Component {


    constructor(props) {
        super(props);
        this.state = { users: [] }
    }

    componentWillMount() {
      fetch('https://private-459d3-elde2e.apiary-mock.com/drivers_by_motor_carrier/0').then((response) => {
        return response.json()
      }).then((users) => {
        this.setState({users: users})
      })
    }

    render() {
    if (this.state.users.length > 0) {
      return (
        <ListGroup>
            {
              this.state.users.map((user) => {
                return <UserRow key={ user.id }
                                    first_name={ user.first_name }
                                    last_name={ user.last_name }
                                    username={ user.username }
                                    picture={ user.picture }/>
              })
            }
        </ListGroup>
      )
    } else {
      return <p className="text-center">Loading Drivers...</p>
    }
  }
}

export default UsersInfo;
