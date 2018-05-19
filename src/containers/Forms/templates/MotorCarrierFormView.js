import React from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
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
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }


  onFormSubmit(data) {
    if (this.props.isCreate) {
      this.props.onRegister(data, this.props.token, 1, null);
    } else {
      this.props.onRegister(data, this.props.token, 0, this.props.match.params.id);
    }
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
              submit={this.onFormSubmit}
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
  match: PropTypes.object.isRequired,
  isCreate: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};


const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  isAdmin: state.auth.role === 'A',
  token: state.auth.token,
  isLoading: state.auth.loading,
});


const mapDispatchToProps = dispatch => ({
  onRegister: (data, token, isCreate) => dispatch(actions.carrierRegister(
    data,
    token,
    isCreate,
  )),

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MotorCarrierFormView));
