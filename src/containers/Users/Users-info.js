import React from 'react';
import { ListGroup } from 'reactstrap';
import UserRow from './User-row';
import Loader from '../../components/Loader/Loader';
import usersService from '../../services/users';
import PropTypes from 'prop-types';

class UsersInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          users: [],
          loading: false,
          loggedUser: null,
         }
    }

    componentDidMount() {
      this.fetchUsers();
    }

    async fetchUsers() {
      this.setState({ loading: true });
      const users = await usersService.getUsers(this.props.motor_carrier_id);
      this.setState({ loading: false, users });
    }

    render() {
      return (
        <div>
          {this.state.loading && <Loader />}

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
        </div>
      )
  }
}

export default UsersInfo;

UsersInfo.propTypes = {
  motor_carrier_id: PropTypes.number.isRequired,
};
