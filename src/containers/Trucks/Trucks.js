import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Aux from '../../hoc/Aux';
import TrucksInfo from './Trucks-info';
import '../../assets/styles/forms.css';
import Alert from '../Alert/Alert';

class Trucks extends React.Component {
  render() {
    let authRedirect = null;
    if (!this.props.isAuthenticated) {
      authRedirect = <Redirect to="/" />;
    }

    /* Alert */
    let alert;
    let msg = '';
    if (this.props.error === null) {
      alert = null;
    } else if (this.props.error.status === 200) {
      msg = 'The vehicle was deleted successfully';
      alert = (<Alert alertType="SUCCESS" message={msg} />);
    } else {
      msg = 'Error the vehicle was not deleted';
      alert = (<Alert alertType="FAIL" message={msg} />);
    }

    return (
      <Aux>
        { authRedirect }
        { alert }
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
  error: PropTypes.object,
};

Trucks.defaultProps = {
  error: null,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  error: state.vehicles.error,
});

export default connect(mapStateToProps)(Trucks);
