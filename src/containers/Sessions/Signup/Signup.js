import React from 'react';
import { Button, Form, FormGroup, Input, Container, Row, Col } from 'reactstrap';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withRouter } from "react-router-dom";


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

    nameChangedHandler = ( event ) => {
        const updatedControls = {
            ...this.state.controls,
            'first_name': {
                ...this.state.controls['first_name'],
                value: event.target.value
            }
        }
        this.setState( { controls: updatedControls } );
    }

    lastChangedHandler = ( event ) => {
        const updatedControls = {
            ...this.state.controls,
            'last_name': {
                ...this.state.controls['last_name'],
                value: event.target.value
            }
        }
        this.setState( { controls: updatedControls } );
    }

    usernameChangedHandler = ( event ) => {
        const updatedControls = {
            ...this.state.controls,
            'username': {
                ...this.state.controls['username'],
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
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.controls.first_name.value,
            this.state.controls.last_name.value,
            this.state.controls.username.value,
            'S'           
        );
        this.props.history.push("/login");

    }

    render() {

        const h1Style = {
            marginTop: "5rem",
            textAlign: "center",
            marginBottom: "2rem"
        };
            
        return (
            <Container>
                <Row>                    
                    <Col sm="12" md={{ size: 5, offset: 3 }}>
                        
                        <h1 style={h1Style}>SignUp</h1>
                        <Form onSubmit={this.submitHandler}>
                            <FormGroup>          
                            <Input type="text" name="username" onChange={ this.usernameChangedHandler }  placeholder="Username" />
                            </FormGroup>
                            <FormGroup>          
                            <Input type="text" name="first_name" onChange={ this.nameChangedHandler }  placeholder="First Name" />
                            </FormGroup>
                            <FormGroup>          
                            <Input type="text" name="last_name" onChange={ this.lastChangedHandler }  placeholder="Last Name" />
                            </FormGroup>
                            <FormGroup>          
                            <Input type="email" name="email" onChange={ this.emailChangedHandler } placeholder="Email" />
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




const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password, first_name, last_name, username, account_type ) => dispatch(actions.signup(email, password, first_name, last_name, username, account_type, 1))

    }
}

export default connect(null, mapDispatchToProps)(Signup);