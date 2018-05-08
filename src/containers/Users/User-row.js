import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ListGroupItem, Button } from 'reactstrap';
import '../../assets/styles/users.css';
import * as actions from '../../store/actions/index';
import api from '../../services/api';

class UserRow extends React.Component {
  onDeleteBtnClick(userId, token) {
    this.props.deleteUser(userId, token);
  }

  render() {
    const pStyle = {
      justifyContent: 'flex-end',
    };

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
              <li><Link to={`/drivers/${this.props.id}`}>{this.props.first_name} {this.props.last_name}</Link></li>
              <li>Username: {this.props.username}</li>
              <li>License Number: {this.props.license_number}</li>
            </ul>
          </div>
        </div>
        <div style={pStyle}>
          <Link className="btn btn-secondary btn-sm" to={`/drivers/${this.props.id}/edit`}>Edit</Link>{' '}
          <Button color="danger" size="sm" onClick={() => this.onDeleteBtnClick(this.props.id, this.props.token)}>Delete</Button>
        </div>
      </ListGroupItem>
    );
  }
}


const mapStateToProps = state => ({
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  deleteUser: (userId, token) => dispatch(actions.onDelete(userId, token)),
});


UserRow.propTypes = {
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  deleteUser: PropTypes.func.isRequired,
  license_number: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(UserRow);
