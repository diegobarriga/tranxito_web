import React from 'react';
import { ListGroup } from 'reactstrap';
import UserRow from './User-row';
import Loader from '../../components/Loader/Loader';
import * as actions from '../../store/actions/users';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import styles from '../../assets/styles/forms.css';


class UsersInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
    this.updateSearch = this.updateSearch.bind(this);
  }

  componentDidMount() {
    this.props.getUsers(this.props.token, this.props.motorCarrierId);
  }

  updateSearch(event) {
    this.setState({ search: event.target.value })
  }

  render() {
    let filtered_users = this.props.users.filter(
      (user) => {
        return (user.first_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
        user.last_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
        user.username.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1);
      }
    );
    return (
      <div>
        <div className="inlineBox">
          <FontAwesomeIcon icon="search" className="customIcon" /><input className="customInput" type='text' value={this.state.search} onChange={this.updateSearch}></input>
          <div className="buttons">
            <Link className="btn btn-sm green spacing" to="/drivers/new_driver"><FontAwesomeIcon icon="user" color="white" /> Create driver</Link>
            <Link className="btn btn-sm green" to="/drivers/new_drivers"><FontAwesomeIcon icon="users" color="white" /> Create multiple drivers</Link>
          </div>
        </div>
        {this.props.loading && <Loader />}
        <ListGroup>
          {
              filtered_users.sort(function(a, b){return a.last_name > b.last_name}).map(user => (<UserRow
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
