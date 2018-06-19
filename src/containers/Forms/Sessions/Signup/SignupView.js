import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../../../../services/api';
import * as actions from '../../../../store/actions/index';
import Loader from '../../../../components/Loader/Loader';
import Alert from '../../../Alert/Alert';
import SignupForm from './SignupForm';


class SignupView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      message: '',
      isLoading: false,
    };
    this.postData = this.postData.bind(this);
    this.patchData = this.patchData.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(formData) {
    this.setState({ isLoading: true });
    // Si estamos creando un usuario
    if (this.props.isCreate) {
      this.postData(formData).then((response) => {
        if (response.status === 200) {
          this.props.createUser(response.data);
          this.setState({ isLoading: false });
          this.setState({ type: 'success', message: 'We have created the new supervisor.' });
        }
      }).catch(() => {
        this.setState({ isLoading: false });
        this.setState({ type: 'danger', message: 'Sorry, there has been an error. Please try again later.' });
      });
    // Si estamos editando un usuario
    } else {
      this.patchData(formData).then((response) => {
        if (response.status === 200) {
          this.props.createUser(response.data);
          this.setState({ isLoading: false });
          this.setState({ type: 'success', message: 'We have edited the supervisor.' });
        }
      }).catch(() => {
        this.setState({ isLoading: false });
        this.setState({ type: 'danger', message: 'Sorry, there has been an error. Please try again later.' });
      });
    }
  }

  postData(data) {
    return api.motorCarriers.createMotorCarrierPeople(
      parseInt(this.props.match.params.mc, 10) || this.props.motorCarrierId,
      this.props.token,
      data,
    );
  }

  patchData(data) {
    return api.people.updateUser(this.props.match.params.id, this.props.token, data);
  }

  render() {
    if (this.state.isLoading === true) return <Loader />;

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

    const {
      isCreate,
      match,
    } = this.props;

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
            <h1 style={h1Style}>{ this.props.title }</h1>
            <SignupForm
              submit={this.onFormSubmit}
              token={this.props.token}
              motorCarrierId={parseInt(this.props.match.params.mc, 10) || this.props.motorCarrierId}
              match={match}
              isCreate={isCreate}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}


SignupView.propTypes = {
  title: PropTypes.string.isRequired,
  isAdmin: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  isCreate: PropTypes.bool.isRequired,
  motorCarrierId: PropTypes.number.isRequired,
  createUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  isAdmin: state.auth.role,
  token: state.auth.token,
  error: state.auth.error,
  isLoading: state.auth.loading,
  motorCarrierId: state.auth.motorCarrierId,
});

const mapDispatchToProps = dispatch => ({
  createUser: user => dispatch(actions.createUser(user)),
  resetError: () => dispatch(actions.errorReset()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupView));
