import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Row, Col, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import Loader from '../../../components/Loader/Loader';
import * as actions from '../../../store/actions/index';
import MotorCarrierForm from './MotorCarrierForm';


class MotorCarrierFormView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  submit(data) {
    this.props.onRegister(data);
    // this.props.token,
    this.props.history.push('/motor_carriers');
  }

  render() {
    if (this.props.isLoading === true) return <Loader />;

    let alert;
    if (this.state.type && this.state.message) {
      if (this.state.type === 'success') {
        alert = (<Alert alertType="SUCCESS" message={this.state.message} />);
      } else if (this.state.type === 'danger') {
        alert = (<Alert alertType="FAIL" message={this.state.message} />);
      }
    }

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
          <Col sm="12" md={{ size: 12 }}>
            { alert }
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 5, offset: 3 }}>
            { authRedirect }
            <h1 style={h1Style}>{ this.props.title }</h1>
            <MotorCarrierForm
              submit={this.submit}
              token={this.props.token}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}


MotorCarrierFormView.propTypes = {
  title: PropTypes.string.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(MotorCarrierFormView);
