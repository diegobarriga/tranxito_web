import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import Aux from '../../hoc/Aux';
import Avatar from '../../components/Avatar';
import * as actions from '../../store/actions/userInfo';
import Loader from '../../components/Loader/Loader';
import api from '../../services/api';

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
  componentDidMount() {
    console.log('didmount user');
    this.props.getUserInfo(this.props.token, this.props.id);
  }

  render() {
    if (this.props.user == null) return <Loader />;

    return (
      <Aux>
        <h1>{`${this.props.user.first_name} ${this.props.user.last_name}`}</h1>
        <Row style={styles.userProfile}>
          <Avatar src={api.images.userImageLink(this.props.user.image)} />
          <div style={styles.userData}>
            <div>Driver license number: {this.props.user.driver_license_number}</div>
            <div>Email: {this.props.user.email}</div>
          </div>
        </Row>
      </Aux>
    );
  }
}

UserInfo.propTypes = {
  user: PropTypes.object,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  email: PropTypes.string,
  image: PropTypes.string,
  driver_license_number: PropTypes.string,
  getUserInfo: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

UserInfo.defaultProps = {
  user: null,
  first_name: undefined,
  last_name: undefined,
  email: undefined,
  image: undefined,
  driver_license_number: undefined,
};

const mapStateToProps = state => ({
  token: state.auth.token,
  loading: state.userInfo.loading,
  user: state.userInfo.user,
});

const mapDispatchToProps = dispatch => ({
  getUserInfo: (token, UserId) => dispatch(actions.getUserInfo(token, UserId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
