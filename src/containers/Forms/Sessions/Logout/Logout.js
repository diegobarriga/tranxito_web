import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class Logout extends Component {
  componentDidMount() {
    // this.props.postLogout(this.props.token);
    this.props.onLogout();
  }
  render() {
    return <Redirect to="/" />;
  }
}


Logout.propTypes = {
  onLogout: PropTypes.func.isRequired,
  // postLogout: PropTypes.func.isRequired,
  // token: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(actions.logout()),
  postLogout: token => dispatch(actions.logoutToken(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
