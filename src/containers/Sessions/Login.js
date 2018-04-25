import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col } from 'reactstrap';

class Login extends React.Component {

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
                            <h1 style={h1Style}>Login</h1>
                        <Form>
                            <FormGroup>
                            <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
                            </FormGroup>
                            <FormGroup>
                            <Input type="password" name="password" id="examplePassword" placeholder="Password" />
                            </FormGroup>
                         </Form>
                        </Col>
                    </Row>
            </Container>



    );
  }
}

export default Login;
