import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Aux from '../../hoc/Aux';


class Dashboard extends React.Component {
  render() {
    let authRedirect = null;
    if (!this.props.isAuthenticated) {
      authRedirect = <Redirect to="/" />;
    }

    let alert = null;

    console.log(this.props.error.status);
    if (this.props.error.status === 200) {
      alert = <div> SUCCESS </div>;
    }


    return (
      <Aux>
        { alert }
        { authRedirect }
        <h1> Dashboard </h1>
      </Aux>
    );
  }
}


Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  isLoading: state.auth.loading,
  error: state.auth.error,
});

export default connect(mapStateToProps)(Dashboard);
