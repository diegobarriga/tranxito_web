import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { translate } from 'react-i18next';
import Loader from '../../../../components/Loader/Loader';
import LoginForm from './LoginForm';
import * as actions from '../../../../store/actions/index';
import Alert from '../../../Alert/Alert';


class LoginView extends Component {
  render() {
    if (this.props.isLoading) return <Loader />;

    const h1Style = {
      marginTop: '5rem',
      textAlign: 'center',
      marginBottom: '2rem',
    };

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      if (this.props.role === 'A') {
        authRedirect = <Redirect to="/motor_carriers" />;
      } else if (this.props.role === 'S') {
        authRedirect = <Redirect to="/drivers" />;
      } else if (this.props.role === 'D') {
        authRedirect = <Redirect to="/profile" />;
      }
    }

    const { t } = this.props;
    /* Alerts */
    let alert;
    let msg = '';
    if (this.props.error === null) {
      alert = null;
    } else if (this.props.error.response.status === 401) {
      msg = t('Error invalid username or password');
      alert = (<Alert alertType="FAIL" message={msg} />);
    }
    return (
      <Container>
        <Row>
          <Col md="12">
            { alert }
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 5, offset: 3 }}>
            { authRedirect }
            <h1 style={h1Style}>{t('Login')}</h1>
            <LoginForm login={this.props.onAuth} />
          </Col>
        </Row>
      </Container>
    );
  }
}

LoginView.propTypes = {
  role: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,

};

LoginView.defaultProps = {
  error: null,
  role: null,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  role: state.auth.role,
  isLoading: state.auth.loading,
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password) => dispatch(actions.login(email, password)),
});

const translateFunc = translate('translations')(LoginView);
export default connect(mapStateToProps, mapDispatchToProps)(translateFunc);
