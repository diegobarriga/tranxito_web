import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import Loader from '../../../components/Loader/Loader';
import * as actions from '../../../store/actions/index';
import CreateMotorCarrierForm from './CreateMotorCarrierForm';


class CreateMotorCarrierView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      redirectTo: false
    }
  }


  submit(data) {
    this.props.onRegister(data);
    // this.props.token,
    this.props.history.push('/motor_carriers');
  }

  render() {
    if (this.props.isLoading === true) return <Loader />;

    const h1Style = {
      marginTop: '5rem',
      textAlign: 'center',
      marginBottom: '2rem',
    };


    let authRedirect = null;
    if (this.props.isAuthenticated) {
      if (!this.props.isAdmin) {
        authRedirect = <Redirect to="/dashboard" />;
      }
    } else {
      authRedirect = <Redirect to="/" />;
    }


    return (
      <Container>
        <Row>
          <Col sm="12" md={{ size: 5, offset: 3 }}>
            { authRedirect }
            <h1 style={h1Style}>Create Motor Carrier</h1>
            <CreateMotorCarrierForm submit={this.submit}/>
          </Col>
        </Row>
      </Container>
    );
  }
}


CreateMotorCarrierView.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onRegister: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};


const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  isAdmin: state.auth.role === 'A',
  token: state.auth.token,
  isLoading: state.auth.loading,
});


const mapDispatchToProps = dispatch => ({
  onRegister: (name, number, mday, token) => dispatch(actions.carrierRegister(
    name,
    number,
    mday,
    token,
  )),

});

export default connect(mapStateToProps, mapDispatchToProps)(CreateMotorCarrierView);
