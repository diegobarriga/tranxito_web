import React from 'react';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import Aux from '../../hoc/Aux';
import Avatar from '../../components/Avatar';
import * as actions from '../../store/actions/userInfo';
import Loader from '../../components/Loader/Loader';
import * as path from '../../store/actions/basepath';

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
  }

  componentDidMount() {
    this.props.getUserInfo(this.props.token, this.props.id);
    console.log('USER', this.props.user);
  }


  render() {
    if (this.props.user == null) return <Loader />;

    return (
      <Aux>
        <h1>{`${this.props.user.first_name} ${this.props.user.last_name}`}</h1>
        <Row style={styles.userProfile}>
          <Avatar src={`${path.BASE_PATH}/api/imageContainers/People/download/${this.props.user.image}`} />
          <div style={styles.userData}>
            <div>Driver license number: {this.props.user.driver_license_number}</div>
            <div>Email: {this.props.user.email}</div>
          </div>
        </Row>

      </Aux>

    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
  loading: state.userInfo.loading,
  user: state.userInfo.user,
});

const mapDispatchToProps = dispatch => ({
  getUserInfo: (token, UserId) => dispatch(actions.getUserInfo(token, UserId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
