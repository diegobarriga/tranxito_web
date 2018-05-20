import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import Aux from '../../hoc/Aux';
import Avatar from '../../components/Avatar';
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
  //
  // componentWillMount() {
  //   this.setState({ user: this.props.users[this.props.id], loading: false });
  // }

  render() {
    // if (this.state.loading === true) return <Loader />;
    console.log(this.props.users);
    return (
      <Aux>
        <h1>{`${this.props.users[this.props.id].first_name} ${this.props.users[this.props.id].last_name}`}</h1>
        <Row style={styles.userProfile}>
          <Avatar src={api.images.userImageLink(this.props.users[this.props.id].image)} />
          <div style={styles.userData}>
            <div>
              Driver license number: {this.props.users[this.props.id].driver_license_number}
            </div>
            <div>Email: {this.props.users[this.props.id].email}</div>
          </div>
        </Row>
      </Aux>
    );
  }
}

UserInfo.propTypes = {
  users: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};


const mapStateToProps = state => ({
  users: state.auth.users,
});

export default connect(mapStateToProps)(UserInfo);
