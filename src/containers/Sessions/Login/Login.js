import React from 'react';
import { Button, Form, FormGroup, Input, Container, Row, Col } from 'reactstrap';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


class Login extends React.Component {
    state = {
        controls:{
            email: {
                value: ''               
            },

            password:{
                value: ''                
            }
        }
    }

    emailChangedHandler = ( event ) => {
        const updatedControls = {
            ...this.state.controls,
            'email': {
                ...this.state.controls['email'],
                value: event.target.value                
            }
        }
        this.setState( { controls: updatedControls } );

        
    }

    passwordChangedHandler = ( event ) => {
        const updatedControls = {
            ...this.state.controls,
            'password': {
                ...this.state.controls['password'],
                value: event.target.value
            }
        }
        this.setState( { controls: updatedControls } );

    }


    submitHandler = ( event ) => {        
        //prevents reloading of the page
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);        

    }


    render() {    
            const h1Style = {
                marginTop: "5rem",
                textAlign: "center",
                marginBottom: "2rem"
            };

            let authRedirect = null;
            if (this.props.isAuthenticated){
                authRedirect = <Redirect to="/dashboard" />;
            }

            return (
                <Container>                         
                    <Row>                    
                        <Col sm="12" md={{ size: 5, offset: 3 }}>
                            { authRedirect }  
                            <h1 style={h1Style}>Login</h1>
                            <Form onSubmit={ this.submitHandler }>
                                <FormGroup>          
                                <Input type="email" invalid={this.state.controls.email.valid} name="email" onChange={ this.emailChangedHandler } placeholder="Email" />
                                </FormGroup>
                                <FormGroup>          
                                <Input type="password" name="password" onChange={ this.passwordChangedHandler }  placeholder="Password" />
                                </FormGroup>
                                <Button>Submit</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
        );
    }
}


const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password, isSignup ) => dispatch(actions.auth(email, password, 0))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);