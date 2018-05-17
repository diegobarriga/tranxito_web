import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import Aux from '../../hoc/Aux';
import Map from './Map';


class Dashboard extends React.Component {
  render() {
    let authRedirect = null;
    if (!this.props.isAuthenticated) {
      authRedirect = <Redirect to="/" />;
    }

    const alert = null;

    return (
      <Aux>
        { alert }
        { authRedirect }
        <Container>
          <h1> Dashboard </h1>
          <Map />
        </Container>

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
