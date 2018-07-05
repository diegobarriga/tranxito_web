import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Row, Button } from 'reactstrap';
import Avatar from '../../components/Avatar';
import api from '../../services/api';
import Aux from '../../hoc/Aux';
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
    alignSelf: 'flex-start',
    justifyContent: 'flex-end',
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
          <div className="user_wrapper">
            <div className="profile-image">
              { this.props.isDriver ?
                <Avatar src={api.images.userImageLink(this.props.user.image)} />
              :
                <Avatar src={api.images.userImageLink(this.props.users[this.props.id].image)} />
              }
            </div>
            <div style={styles.userData}>
              { this.props.isDriver ?
                <h5>{`${this.props.user.firstName} ${this.props.user.lastName}`}</h5>
              :
                <h5>{`${this.props.users[this.props.id].firstName} ${this.props.users[this.props.id].lastName}`}</h5>
              }
              <div>
                <FontAwesomeIcon icon="address-card" className="customIcon" />{'   '}

                { this.props.isDriver ?
                  <Aux>{this.props.user.driverLicenseNumber}</Aux>
                :
                  <Aux>{this.props.users[this.props.id].driverLicenseNumber}</Aux>
                }
              </div>
              <div>
                <FontAwesomeIcon icon="envelope" className="customIcon" />{'   '}
                { this.props.isDriver ?
                  <Aux>{this.props.user.email}</Aux>
                :
                  <Aux>{this.props.users[this.props.id].email}</Aux>
                }
              </div>
            </div>
          </div>
          <div style={styles.pStyle}>
            { !this.props.isDriver &&
              <Link className="btn btn-secondary btn-sm btn-pad" to={`/drivers/${this.props.id}/edit`}><FontAwesomeIcon icon="edit" color="white" /></Link>
            }

            { !this.props.isDriver &&
              <Button color="danger" size="sm" onClick={() => this.onDeleteBtnClick(this.props.id, this.props.token)}><FontAwesomeIcon icon="trash" color="white" /></Button>
            }
          </div>
        </Row>
      </div>
    );
  }
}

UserInfo.propTypes = {
  users: PropTypes.object,
  id: PropTypes.any.isRequired,
  token: PropTypes.string.isRequired,
  deleteUser: PropTypes.func.isRequired,
  isDriver: PropTypes.bool,
  user: PropTypes.object.isRequired,
};

UserInfo.defaultProps = {
  users: null,
  isDriver: undefined,
};
const mapDispatchToProps = dispatch => ({
  deleteUser: (userId, token) => dispatch(actions.onDelete(userId, token)),
});

const mapStateToProps = state => ({
  users: state.auth.users,
  user: state.auth,
  token: state.auth.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
