import React from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import Loader from '../../../components/Loader/Loader';
import * as actions from '../../../store/actions/index';
import MotorCarrierForm from './MotorCarrierForm';
import Alert from '../../Alert/Alert';


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
    const { t } = this.props;
    let alert;
    let msg = '';
    console.log(this.props.error);
    if (this.props.error === null) {
      alert = null;
    } else if (this.props.error.status === 200) {
      msg = t('The Motor Carrier was created successfully');
      alert = (<Alert alertType="SUCCESS" message={msg} />);
    } else {
      msg = t('Error the Motor Carrier could not be created');
      alert = (<Alert alertType="FAIL" message={msg} />);
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MotorCarrierFormView));
