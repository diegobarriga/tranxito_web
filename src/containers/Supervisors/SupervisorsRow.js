import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../assets/styles/users.css';
import api from '../../services/api';

class SupervisorsRow extends React.Component {
  render() {
    return (
      <div className="item">
        <div className="user_wrapper">
          <figure className="left">
            <img style={{ borderRadius: '50%' }} alt="profile-pic" height="100" width="100" src={api.images.userImageLink(this.props.image)} />
          </figure>
          <div className="right">
            <ul>
              <li>{this.props.first_name} {this.props.last_name}</li>
              <li>Username: {this.props.username}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  token: state.auth.token,
});


SupervisorsRow.propTypes = {
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};


export default connect(mapStateToProps)(SupervisorsRow);
