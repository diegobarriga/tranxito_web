import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';
import '../../assets/styles/users.css';
import * as actions from '../../store/actions/index';
import api from '../../services/api';

class SupervisorsRow extends React.Component {
  onDeleteBtnClick(userId, token) {
    const confirmDelete = window.confirm('Are you sure you want to delete this supervisor?');
    if (confirmDelete) {
      this.props.deleteUser(userId, token);
    }
  }
  render() {
    const pStyle = {
      justifyContent: 'flex-end',
    };
    return (
      <div className="item">
        <div className="user_wrapper">
          <figure className="left">
            <img style={{ borderRadius: '50%' }} alt="profile-pic" height="100" width="100" src={api.images.userImageLink(this.props.image)} />
          </figure>
          <div className="right">
            <ul>
              <li>{this.props.firstName} {this.props.lastName}</li>
              <li>Username: {this.props.username}</li>
            </ul>
          </div>
          <div style={pStyle}>
            <Link className="btn btn-secondary btn-sm" to={`/supervisors/${this.props.id}/new_supervisor`}><FontAwesomeIcon icon="edit" color="white" /></Link>{' '}
            <Button color="danger" size="sm" onClick={() => this.onDeleteBtnClick(this.props.id, this.props.token)}><FontAwesomeIcon icon="trash" color="white" /></Button>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  deleteUser: (userId, token) => dispatch(actions.onDelete(userId, token)),
});

SupervisorsRow.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  deleteUser: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(SupervisorsRow);
