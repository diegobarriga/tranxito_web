import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { Button, Container, Row, Col } from 'reactstrap';
import Loader from '../../../../components/Loader/Loader';
import LoginForm from './LoginForm';
import * as actions from '../../../../store/actions/index';


class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      redirectTo: false,
      pathname: '',
    };
  // this.submit = this.submit.bind(this);
  }

  // login(event) {
  //   // prevents reloading of the page
  //   event.preventDefault();
  //   this.props.onAuth(data).then(() => {
  //     this.props.addFlashMessage({
  //       type: 'success',
  //       text: 'Login successful'
  //     });
  //     this.setState({ redirectTo: true, pathname: '/companies'});
  //   });
  // }

  render() {
    const { errors, redirectTo } = this.state;
    if (this.props.isLoading === true) return <Loader />;

    const h1Style = {
      marginTop: '5rem',
      textAlign: 'center',
      marginBottom: '2rem',
    };

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      if (this.props.isAdmin) {
        authRedirect = <Redirect to="/motor_carriers" />;
      } else {
        authRedirect = <Redirect to="/dashboard" />;
      }
    }

    return (
      <Container>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            { authRedirect }
            <h1 style={h1Style}>Login</h1>
            {errors.form && <Alert bsStyle="danger">{errors.form}</Alert>}
            <LoginForm login={this.props.onAuth} />
          </Col>
        </Row>
      </Container>
    );
  }
}

LoginView.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  // error: PropTypes.object,
};
/*
LoginView.defaultProps = {
  error: null,
};
*/

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  isAdmin: state.auth.role === 'A',
  isLoading: state.auth.loading,
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  onAuth: credentials => dispatch(actions.login(credentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
