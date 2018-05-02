import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Input, Container, Row, Col, Label } from 'reactstrap';
import { connect } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import * as actions from '../../store/actions/index';


class CarrierRegister extends React.Component {
  state = {
    controls: {
      name: {
        value: '',
      },
      number: {
        value: '',
      },
      mday: {
        value: '7',
      },
    },
  }

  onInputChange = (event) => {
    const state = this.state;
    state.controls[event.target.name].value = event.target.value;
    this.setState(state);
  }


  submitHandler = (event) => {
    // prevents reloading of the page
    event.preventDefault();
    this.props.onRegister(
      this.state.controls.name.value,
      this.state.controls.number.value,
      this.state.controls.mday.value,
      this.props.token,
    );
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
            <Form onSubmit={this.submitHandler}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" onChange={this.onInputChange} placeholder="name" />
              </FormGroup>
              <FormGroup>
                <Label for="mday">USDOT Number</Label>
                <Input type="text" name="number" onChange={this.onInputChange} placeholder="USDOT Number" />
              </FormGroup>
              <FormGroup>
                <Label for="mday">Multiday basis used</Label>
                <Input type="select" onChange={this.onInputChange} name="mday" >
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

export default connect(mapStateToProps, mapDispatchToProps)(CarrierRegister);
