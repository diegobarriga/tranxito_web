import React from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Input, Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';



class Signup extends React.Component {

  state = {
    controls:{
      email: {
        value: ''
      },
      password:{
        value: ''
      },
      last_name:{
        value: ''
      },
      first_name:{
        value: ''
      },
      username:{
        value: ''
      },
      account_type:{
        value: 'S'
      }
    }
  }


    onInputChange = ( event ) => {
      const state = this.state;
      state['controls'][event.target.name].value = event.target.value;
      this.setState(state);
    }


    submitHandler = ( event ) => {
      
      //prevents reloading of the page
      event.preventDefault();
        this.props.onAuth(
        this.state.controls.email.value,
        this.state.controls.password.value,
        this.state.controls.first_name.value,
        this.state.controls.last_name.value,
        this.state.controls.username.value,
        this.state.controls.account_type.value,
        this.props.match.params.id
      );
      this.props.history.push("/motor_carriers");
    }

    render() {
      const h1Style = {
        marginTop: "5rem",
        textAlign: "center",
        marginBottom: "2rem"
      };
            

      let authRedirect = null;
      if (this.props.isAuthenticated){
        if (!this.props.isAdmin){
          authRedirect = <Redirect to="/dashboard" />;
        }
      }       
      else {            
        authRedirect = <Redirect to="/" />;
      }

      

      return (
        <Container>
          <Row>                    
            <Col sm="12" md={{ size: 5, offset: 3 }}>
              { authRedirect }
              <h1 style={h1Style}>Register Supervisor</h1>
              <Form onSubmit={ this.submitHandler }>
                <FormGroup>          
                  <Input type="text" name="username" onChange={ this.onInputChange }  placeholder="Username" />
                </FormGroup>
                <FormGroup>          
                  <Input type="text" name="first_name" onChange={ this.onInputChange }  placeholder="First Name" />
                </FormGroup>
                <FormGroup>          
                  <Input type="text" name="last_name" onChange={ this.onInputChange }  placeholder="Last Name" />
                </FormGroup>
                <FormGroup>          
                  <Input type="email" name="email" onChange={ this.onInputChange } placeholder="Email" />
                </FormGroup>
                <FormGroup>          
                  <Input type="password" name="password" onChange={ this.onInputChange }  placeholder="Password" />
                </FormGroup>
                <Button>Submit</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      );
    }
}


Signup.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
};


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        isAdmin: state.auth.role === 'A'
    };
};


const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password, first_name, last_name, username, account_type, motorCarrierId ) => dispatch(actions.signup(email, password, first_name, last_name, username, account_type, motorCarrierId))

    }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Signup)
);