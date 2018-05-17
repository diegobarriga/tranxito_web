import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Input, Container, Row, Col, Label } from 'reactstrap';
import { connect } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import * as actions from '../../store/actions/index';
import Alert from '../Alert/Alert';


class CarrierRegister extends React.Component {
  state = {
    name: '',
    number: '',
    mday: '7',
  }

  componentDidMount() {
    this.props.resetError();
  }

  handleFieldChange(fieldName) {
    return (ev) => {
      this.setState({
        [fieldName]: ev.target.value,
      });
    };
  }


  submitHandler = (event) => {
    // prevents reloading of the page
    event.preventDefault();
    this.props.onRegister(
      this.state.name,
      this.state.number,
      this.state.mday,
      this.props.token,
    );
  }

  render() {
    if (this.props.isLoading === true) return <Loader />;

    const h1Style = {
      marginTop: '2rem',
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

    /* Alert */
    let alert;
    let msg = '';
    if (this.props.error === null) {
      alert = null;
    } else if (this.props.error.status === 200) {
      msg = 'The Motor Carrier was created successfully';
      alert = (<Alert alertType="SUCCESS" message={msg} />);
    } else {
      msg = 'Error the motor carrier could not be created';
      alert = (<Alert alertType="FAIL" message={msg} />);
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
            <h1 style={h1Style}>Create Motor Carrier</h1>
            <Form onSubmit={this.submitHandler}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" onChange={this.handleFieldChange('name')} placeholder="name" />
              </FormGroup>
              <FormGroup>
                <Label for="mday">USDOT Number</Label>
                <Input type="text" name="number" onChange={this.handleFieldChange('number')} placeholder="USDOT Number" />
              </FormGroup>
              <FormGroup>
                <Label for="mday">Multiday basis used</Label>
                <Input type="select" onChange={this.handleFieldChange('mday')} name="mday" >
                  <option>7</option>
                  <option>8</option>
                </Input>
              </FormGroup>
              <Button>Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}


CarrierRegister.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onRegister: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  resetError: PropTypes.func.isRequired,
  error: PropTypes.object,
};


CarrierRegister.defaultProps = {
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
  onRegister: (name, number, mday, token) => dispatch(actions.carrierRegister(
    name,
    number,
    mday,
    token,
  )),
  resetError: () => dispatch(actions.errorReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CarrierRegister);
