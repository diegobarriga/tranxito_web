import React from 'react';
import { ListGroup } from 'reactstrap';
import UserRow from './User-row';
import Loader from '../../components/Loader/Loader';
import * as actions from '../../store/actions/users';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class UsersInfo extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.getUsers(this.props.token, this.props.motorCarrierId);
  }

  render() {

    return (
      <div>
        {this.props.loading && <Loader />}

        <ListGroup>
          {
              this.props.users.map(user => (<UserRow
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
        motorCarrierId: state.auth.motorCarrierId,
        users: state.users.users,
        loading: state.users.loading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUsers: ( token, motorCarrierId ) => dispatch(actions.getUsers(token, motorCarrierId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersInfo);
