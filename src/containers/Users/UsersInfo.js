import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import UserRow from './UserRow';
import '../../assets/styles/forms.css';
import Loader from '../../components/Loader/Loader';


class UsersInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      pages: '5',
    };
    this.updateSearch = this.updateSearch.bind(this);
  }

  // componentDidMount() {
  //   this.props.getUsers(this.props.token, this.props.motorCarrierId);
  // }

  updateSearch(event) {
    this.setState({ search: event.target.value });
  }

  render() {
    if (this.props.isLoading === true) return <Loader />;

    const filteredUsers = Object.values(this.props.users).filter(user => ((
      user.first_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
      user.last_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
      user.username.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1) &&
      user.account_status === true && user.account_type === 'D'));

    console.log(typeof (filteredUsers));
    return (
      <div>
        <div className="inlineBox">
          <FontAwesomeIcon icon="search" className="customIcon" /><input className="customInput" type="text" value={this.state.search} onChange={this.updateSearch} />
          <div className="buttons">
            <Link className="btn btn-sm green spacing" to="/drivers/new_driver"><FontAwesomeIcon icon="user" color="white" /> Create driver</Link>
            <Link className="btn btn-sm green" to="/drivers/new_drivers"><FontAwesomeIcon icon="users" color="white" /> Create multiple drivers</Link>
          </div>
        </div>

        <div className="ui divided items">
          {
              filteredUsers.sort((a, b) => a.last_name > b.last_name)
              .slice(
                ((this.props.pageNumber * this.state.pages) - 5),
                 this.props.pageNumber * this.state.pages,
                )
              .map(user => (<UserRow
                key={user.id}
                id={user.id}
                first_name={user.first_name}
                last_name={user.last_name}
                username={user.username}
                license_number={user.driver_license_number}
                image={user.image}
              />))
            }
        </div>
      </div>
    );
  }
}

UsersInfo.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  users: PropTypes.object.isRequired,
  pageNumber: PropTypes.any.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.users.loading,
  users: state.auth.users,
});

export default connect(mapStateToProps)(UsersInfo);
