import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Row, Button } from 'reactstrap';
import Avatar from '../../components/Avatar';
import api from '../../services/api';
import * as actions from '../../store/actions/index';
import '../../assets/styles/users.css';

const styles = {
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: '24px 12px',
  },
  userData: {
    flexDirection: 'column',
    marginLeft: '12px',
  },
  pStyle: {
    flexGrow: 2,
    justifyContent: 'flex-start',
  },
};

class UserInfo extends React.Component {
  onDeleteBtnClick(userId, token) {
    const confirmDelete = window.confirm('Are you sure you want to delete this driver?');
    if (confirmDelete) {
      this.props.deleteUser(userId, token);
    }
  }

  render() {
    return (
      <div className="item user-card">

        <Row style={styles.userProfile} className="user-profile-info">
          <div className="profile-image">
            <Avatar src={api.images.userImageLink(this.props.users[this.props.id].image)} />
          </div>
          <div style={styles.userData}>
            <h5>{`${this.props.users[this.props.id].first_name} ${this.props.users[this.props.id].last_name}`}</h5>
            <div>
              <FontAwesomeIcon icon="address-card" className="customIcon" />{'   '}
              {this.props.users[this.props.id].driver_license_number}
            </div>
            <div>
              <FontAwesomeIcon icon="envelope" className="customIcon" />{'   '}
              {this.props.users[this.props.id].email}
            </div>
          </div>
          <div style={styles.pStyle}>
            <Link className="btn btn-secondary btn-sm" to={`/drivers/${this.props.id}/edit`}><FontAwesomeIcon icon="edit" color="white" /></Link>{' '}
            <Button color="danger" size="sm" onClick={() => this.onDeleteBtnClick(this.props.id, this.props.token)}><FontAwesomeIcon icon="trash" color="white" /></Button>
          </div>
        </Row>
      </div>
    );
  }
}


UserInfo.propTypes = {
  users: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  deleteUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  deleteUser: (userId, token) => dispatch(actions.onDelete(userId, token)),
});

const mapStateToProps = state => ({
  users: state.auth.users,
  token: state.auth.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
