import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import Loader from '../../../../components/Loader/Loader';
import Alert from '../../../Alert/Alert';
import SignupForm from './SignupForm';
import getLastMod from '../../../../utils/updateStoreFunctions';
import api from '../../../../services/api';

class SignupView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      message: '',
      isLoading: false,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  async onFormSubmit(data) {
    this.setState({ isLoading: true });

    api.motorCarriers.createMotorCarrierPeople(data.motorCarrierId, data.token, data)
      .then(async (response) => {
        if (response.status === 200) {
          this.props.createSuccess(response);

          const lastModAPI = await getLastMod(this.props.motorCarrierId, this.props.token);
          const { lastMod } = this.props;
          lastMod.people = lastModAPI.people;
          this.props.updateLastMod(lastMod);
          this.setState({ isLoading: false });
        } else {
          this.setState({ isLoading: false });
          this.setState({ type: 'danger', message: 'Sorry, there has been an error. Please try again later.' });
        }
      }).catch(() => {
        this.setState({ isLoading: false });
        this.setState({ type: 'danger', message: 'Sorry, there has been an error. Please try again later.' });
      });
  }

  render() {
    if (this.props.isLoading || this.state.isLoading) return <Loader />;

    const h1Style = {
      marginTop: '1rem',
      marginBottom: '2rem',
    };

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      if (this.props.isAdmin === 'D') {
        authRedirect = <Redirect to="/dashboard" />;
      }
    } else {
      authRedirect = <Redirect to="/" />;
    }

    /* Alert */
    let alert;
    if (this.state.type && this.state.message) {
      if (this.state.type === 'success') {
        alert = (<Alert alertType="SUCCESS" message={this.state.message} />);
      } else if (this.state.type === 'danger') {
        alert = (<Alert alertType="FAIL" message={this.state.message} />);
      }
    }

    return (

      <Container>
        <Row>
          <Col sm="12" md={{ size: 12 }}>
            { alert }
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 8 }}>
            { authRedirect }
            <h1 style={h1Style}>Register Supervisor</h1>
            <SignupForm
              submit={this.onFormSubmit}
              token={this.props.token}
              motorCarrierId={this.props.match.params.id}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

SignupView.propTypes = {
  isAdmin: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  createSuccess: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  updateLastMod: PropTypes.func.isRequired,
  motorCarrierId: PropTypes.number.isRequired,
  lastMod: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  isAdmin: state.auth.role,
  token: state.auth.token,
  error: state.auth.error,
  isLoading: state.auth.loading,
  motorCarrierId: state.auth.motorCarrierId,
  lastMod: state.auth.lastMod,
});

const mapDispatchToProps = dispatch => ({
  createSuccess: data => dispatch(actions.createSuccess(data)),
  resetError: () => dispatch(actions.errorReset()),
  updateLastMod: lastMod => dispatch(actions.updateLastMod(lastMod)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupView));
