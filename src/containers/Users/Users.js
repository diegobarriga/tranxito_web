import React from 'react';
import { Link } from 'react-router-dom'
import { ListGroup, ListGroupItem, Button, Row, Col, Container } from 'reactstrap';
import Aux from '../../hoc/Aux';





class Users extends React.Component {


    onDeleteBtnClick(){

    }

    render(){

      const pStyle = {
        justifyContent: "flex-end"
      };

      const divStyle = {
        display: "flex"

      }

        return (
            <Aux>
            <h1> Drivers </h1>
            <Container>
              <ListGroup>
                <ListGroupItem style={divStyle} className="justify-content-between">
                  <Link to="/">Florencia Barrios</Link>
                  <div style={pStyle}>
                    <Link style={pStyle} className="btn btn-secondary btn-sm" to="/">Edit</Link>{' '}
                    <Button style={pStyle} color="danger" size="sm" onClick={() => this.onDeleteBtnClick()}>Delete</Button>
                  </div>
                </ListGroupItem>

                <ListGroupItem style={divStyle} className="justify-content-between">
                  <Link to="/">Polo Vargas</Link>
                  <div style={pStyle}>
                    <Link style={pStyle} className="btn btn-secondary btn-sm" to="/">Edit</Link>{' '}
                    <Button style={pStyle} color="danger" size="sm" onClick={() => this.onDeleteBtnClick()}>Delete</Button>
                  </div>
                </ListGroupItem>

                <ListGroupItem style={divStyle} className="justify-content-between">
                  <Link to="/">Benjamin Peña</Link>
                  <div style={pStyle}>
                    <Link style={pStyle} className="btn btn-secondary btn-sm" to="/">Edit</Link>{' '}
                    <Button style={pStyle} color="danger" size="sm" onClick={() => this.onDeleteBtnClick()}>Delete</Button>
                  </div>
                </ListGroupItem>

                <ListGroupItem style={divStyle} className="justify-content-between">
                  <Link to="/">Andrea Roizman</Link>
                  <div style={pStyle}>
                    <Link style={pStyle} className="btn btn-secondary btn-sm" to="/">Edit</Link>{' '}
                    <Button style={pStyle} color="danger" size="sm" onClick={() => this.onDeleteBtnClick()}>Delete</Button>
                  </div>
                </ListGroupItem>

                <ListGroupItem style={divStyle} className="justify-content-between">
                  <Link to="/">Vicente Claro</Link>
                  <div style={pStyle}>
                    <Link style={pStyle} className="btn btn-secondary btn-sm" to="/">Edit</Link>{' '}
                    <Button style={pStyle} color="danger" size="sm" onClick={() => this.onDeleteBtnClick()}>Delete</Button>
                  </div>
                </ListGroupItem>

                <ListGroupItem style={divStyle} className="justify-content-between">
                  <Link to="/">Felipe Garrido</Link>
                  <div style={pStyle}>
                    <Link style={pStyle} className="btn btn-secondary btn-sm" to="/">Edit</Link>{' '}
                    <Button style={pStyle} color="danger" size="sm" onClick={() => this.onDeleteBtnClick()}>Delete</Button>
                  </div>
                </ListGroupItem>

              </ListGroup>
            </Container>
            </Aux>

        );
    }
}

export default Users;
