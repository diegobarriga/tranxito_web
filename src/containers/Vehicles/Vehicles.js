import React from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import VehiclesInfo from './VehiclesInfo';
import Aux from '../../hoc/Aux';
import '../../assets/styles/forms.css';
import Alert from '../Alert/Alert';

class Vehicles extends React.Component {
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
    const h1Style = {
      marginTop: '1rem',
      marginBottom: '2rem',
    };
    return (
      <Aux>
        { authRedirect }
        { alert }
        <Container>
          <Row>
            <Col md="11">
              <h1 style={h1Style}> Vehicles </h1>
              <VehiclesInfo />
            </Col>
          </Row>
        </Container>
      </Aux>

    );
  }
}

Vehicles.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

Vehicles.defaultProps = {
  error: null,
};

const mapStateToProps = state => ({
  vehicles: state.auth.vehicles,
  isAuthenticated: state.auth.token !== null,
  error: state.auth.error,
});

export default connect(mapStateToProps)(Vehicles);
