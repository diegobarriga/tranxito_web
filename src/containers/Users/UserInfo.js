import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Row } from 'reactstrap';
import Avatar from '../../components/Avatar';
import api from '../../services/api';
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
};

class UserInfo extends React.Component {
  render() {
    // if (this.state.loading === true) return <Loader />;
    console.log(this.props.users);
    return (
      <div className="user-card">

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
        </Row>
      </div>
    );
  }
}

//
// <div class="item">
//     <div class="image">
//       <img src="/images/wireframe/image.png">
//     </div>
//     <div class="content">
//       <a class="header">Header</a>
//       <div class="meta">
//         <span>Description</span>
//       </div>
//       <div class="description">
//         <p></p>
//       </div>
//       <div class="extra">
//         Additional Details
//       </div>
//     </div>
//   </div>

UserInfo.propTypes = {
  users: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};


const mapStateToProps = state => ({
  users: state.auth.users,
});

export default connect(mapStateToProps)(UserInfo);
