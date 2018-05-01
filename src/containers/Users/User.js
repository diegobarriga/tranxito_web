import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ListGroup, ListGroupItem, Button, Row, Col, Container, Table } from 'reactstrap';
import Aux from '../../hoc/Aux';
import Avatar from '../../components/Avatar';
import Graph from './graph';
import UserLogs from './User-logs';
import UserInfo from './User-info';
import Loader from '../../components/Loader/Loader';



class User extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    const { id } = this.props.match.params;



    return (
      <Aux>
        <UserInfo id={id}/>
        <Graph />
        <UserLogs id={id}/>
      </Aux>

    );
  }
}

export default User;
