import React from 'react';
import { Link } from 'react-router-dom'
import { ListGroup, ListGroupItem, Button, Container } from 'reactstrap';
import Aux from '../../hoc/Aux';
import TrucksInfo from './Trucks-info';

class Trucks extends React.Component {

    onDeleteBtnClick(){
    }

    render(){
        return (
            <Aux>
            <h1> Trucks </h1>
            <Container>
               <TrucksInfo motor_carrier_id={ 0 }/>
            </Container>
            </Aux>

        );
    }
}

export default Trucks;
