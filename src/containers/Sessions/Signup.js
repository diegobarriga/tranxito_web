import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col } from 'reactstrap';



class Signup extends React.Component {

    render() {

        const h1Style = {
            marginTop: "5rem",
            textAlign: "center",
            marginBottom: "2rem"

        }; 
    
        return (
            <Container>
                <Form>
                    <Row>                    
                        <Col sm="12" md={{ size: 5, offset: 3 }}>
                            <h1 style={h1Style}>SignUp</h1>

                            <FormGroup>          
                            <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
                            </FormGroup>
                            <FormGroup>          
                            <Input type="password" name="password" id="examplePassword" placeholder="Password" />
                            </FormGroup>
                            <FormGroup>          
                            <Input type="password" name="password" id="examplePassword" placeholder="Password confirmation" />
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </Container>
        );
    }
    }

export default Signup;