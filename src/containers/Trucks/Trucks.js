import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Aux from '../../hoc/Aux';
import TrucksInfo from './Trucks-info';
import '../../assets/styles/forms.css';

class Trucks extends React.Component {
  render() {
    let authRedirect = null;
    if (!this.props.isAuthenticated) {
      authRedirect = <Redirect to="/" />;
    }

    return (
      <Aux>
        { authRedirect }
        <h1> Vehicles </h1>
        <Container>
          <TrucksInfo />
        </Container>
      </Aux>

    );
  }
}

Trucks.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
});

export default connect(mapStateToProps)(Trucks);
