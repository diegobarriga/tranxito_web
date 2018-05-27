import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'reactstrap';
import '../../assets/styles/users.css';
import api from '../../services/api';

class SupervisorsRow extends React.Component {
  render() {
    const divStyle = {
      display: 'flex',
      flexDirection: 'row',
    };

    return (
      <ListGroupItem style={divStyle} className="justify-content-between">
        <div className="user_wrapper">
          <figure className="left">
            <img className="media-object" alt="profile-pic" width="100px" src={api.images.userImageLink(this.props.image)} />
          </figure>
          <div className="right">
            <ul>
              <li>{this.props.first_name} {this.props.last_name}</li>
              <li>Username: {this.props.username}</li>
            </ul>
          </div>
        </div>
      </ListGroupItem>
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
