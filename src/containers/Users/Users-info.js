import React from 'react';
import { ListGroup } from 'reactstrap';
import UserRow from './User-row';
import Loader from '../../components/Loader/Loader';
import usersService from '../../services/users';
import * as actions from '../../store/actions/users';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class UsersInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: false,
      loggedUser: null,
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

<<<<<<< Updated upstream
  async fetchUsers() {
    this.setState({ loading: true });
    const users = await usersService.getUsers(this.props.motor_carrier_id);
    this.setState({ loading: false, users });
  }
=======
    async fetchUsers() {
      const users = this.props.getUsers(this.props.token, this.props.motorCarrierId);
    }
>>>>>>> Stashed changes

  render() {
    return (
      <div>
        {this.state.loading && <Loader />}

        <ListGroup>
          {
              this.state.users.map(user => (<UserRow
                key={user.id}
                id={user.id}
                first_name={user.first_name}
                last_name={user.last_name}
                username={user.username}
                picture={user.picture}
              />))
            }
        </ListGroup>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        motorCarrierId: state.motorCarrierId,
        users: state.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUsers: ( users ) => dispatch(actions.getUsers(token, motorCarrierId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersInfo);
