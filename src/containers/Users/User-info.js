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
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true,
    };
  }

  componentWillMount() {
    this.setState({ user: this.props.users[this.props.id], loading: false });
  }

  render() {
    console.log(this.state.user);
    console.log()
    if (this.state.loading === true) return <Loader />;

    return (
      <Aux>
        <h1>{`${this.state.user.first_name} ${this.state.user.last_name}`}</h1>
        <Row style={styles.userProfile}>
          <Avatar src={api.images.userImageLink(this.state.user.image)} />
          <div style={styles.userData}>
            <div>Driver license number: {this.state.user.driver_license_number}</div>
            <div>Email: {this.state.user.email}</div>
          </div>
        </Row>
      </Aux>
    );
  }
}

UserInfo.propTypes = {
  users: PropTypes.object,
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
  users: null,
  first_name: undefined,
  last_name: undefined,
  email: undefined,
  image: undefined,
  driver_license_number: undefined,
};

const mapStateToProps = state => ({
  token: state.auth.token,
  loading: state.userInfo.loading,
  users: state.users.users,
});

const mapDispatchToProps = dispatch => ({
  getUserInfo: (token, UserId) => dispatch(actions.getUserInfo(token, UserId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
