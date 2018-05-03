import React from 'react';
import { ListGroup, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import UserRow from './User-row';
import Loader from '../../components/Loader/Loader';
import * as actions from '../../store/actions/users';
import '../../assets/styles/forms.css';


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
    console.log(this.props.users);
  }

  updateSearch(event) {
    this.setState({ search: event.target.value });
  }

  render() {
    if (this.props.isLoading === true) return <Loader />;

    const filtered_users = this.props.users.filter(user => ((user.first_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
        user.last_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
        user.username.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1) && user.account_status === true && user.account_type === 'D'));
    return (
      <div>
        <div className="inlineBox">
          <FontAwesomeIcon icon="search" className="customIcon" /><input className="customInput" type="text" value={this.state.search} onChange={this.updateSearch} />
          <div className="buttons">
            <Link className="btn btn-sm green spacing" to="/drivers/new_driver"><FontAwesomeIcon icon="user" color="white" /> Create driver</Link>
            <Link className="btn btn-sm green" to="/drivers/new_drivers"><FontAwesomeIcon icon="users" color="white" /> Create multiple drivers</Link>
          </div>
        </div>

        <ListGroup>
          {
              filtered_users.sort((a, b) => a.last_name > b.last_name).map(user => (<UserRow
                key={user.id}
                id={user.id}
                first_name={user.first_name}
                last_name={user.last_name}
                username={user.username}
                license_number={user.driver_license_number}
                image={user.image}
              />))
            }
        </ListGroup>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
  motorCarrierId: state.auth.motorCarrierId,
  users: state.users.users,
  loading: state.users.loading,
  isLoading: state.users.loading,
});

const mapDispatchToProps = dispatch => ({
  getUsers: (token, motorCarrierId) => dispatch(actions.getUsers(token, motorCarrierId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersInfo);
