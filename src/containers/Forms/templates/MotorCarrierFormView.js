import React from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Loader from '../../../components/Loader/Loader';
import * as actions from '../../../store/actions/index';
import MotorCarrierForm from './MotorCarrierForm';
import Alert from '../../Alert/Alert';


class MotorCarrierFormView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: null,
      type: null,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }


  onFormSubmit(data) {
    const { t } = this.props;
    if (this.props.isCreate) {
      this.props.onRegister(data, this.props.token, 1, null);
    } else {
      this.props.onRegister(data, this.props.token, 0, this.props.match.params.id);
    }
    if (this.props.isLoading === false) {
      console.log(this.props.error);
      if (this.props.error === null || this.props.error.status === 200) {
        console.log('ALERTA SUCCESS');
        if (this.props.isCreate) {
          this.setState({ msg: t('The Motor Carrier was created successfully'), type: 'success' });
        } else {
          this.setState({ msg: t('The Motor Carrier was edited successfully'), type: 'success' });
        }
      } else if (this.props.error.status !== 200) {
        console.log('ALERTA FAIL');
        if (this.props.isCreate) {
          this.setState({ msg: t('Error the Motor Carrier could not be created'), type: 'fail' });
        } else {
          this.setState({ msg: t('Error the Motor Carrier could not be edited'), type: 'fail' });
        }
      }
    }
  }

  render() {
    if (this.props.isLoading === true) return <Loader />;
    const { t } = this.props;
    let alert;
    if (this.state.type && this.state.msg) {
      if (this.state.type === 'success') {
        alert = (<Alert alertType="SUCCESS" message={this.state.msg} />);
      } else if (this.state.type === 'fail') {
        alert = (<Alert alertType="FAIL" message={this.state.msg} />);
      }
    }

    const h1Style = {
      marginTop: '1rem',
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
          <Col sm="12" md={{ size: 7 }}>
            { authRedirect }
            <h1 style={h1Style}>{ this.props.title }</h1>
            <MotorCarrierForm
              submit={this.onFormSubmit}
              token={this.props.token}
              isCreate={this.props.isCreate}
              id={this.props.match.params.id}
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
  error: PropTypes.object,
};

MotorCarrierFormView.defaultProps = {
  error: null,
};


const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  isAdmin: state.auth.role === 'A',
  token: state.auth.token,
  isLoading: state.mCarrier.loading,
  error: state.mCarrier.error,
});


const mapDispatchToProps = dispatch => ({
  onRegister: (data, token, isCreate, id) => dispatch(actions.carrierRegister(
    data,
    token,
    isCreate,
    id,
  )),

});


const translateFunc = translate('translations')(MotorCarrierFormView);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translateFunc));
