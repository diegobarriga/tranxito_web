import React from 'react';
import { Link } from 'react-router-dom'
import { ListGroup, ListGroupItem, Button, Row, Col, Container } from 'reactstrap';
import Aux from '../../hoc/Aux';
import UsersInfo from './Users-info';

class Users extends React.Component {

    onDeleteBtnClick(){
    }

    render(){
        return (
            <Aux>
            <h1> Drivers </h1>
            <Container>
              <UsersInfo motor_carrier_id={ 0 }/>
            </Container>
            </Aux>

        );
    }
}

export default Users;
