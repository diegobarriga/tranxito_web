import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../assets/styles/sidebar.css';
import Aux from '../../hoc/Aux';

const sidebar = props => (

  <div className="sidebar">
    <div>
      <ListGroup>
        {props.isAdm ?
          <Link className="list-group-item-action list-group-item" to="/motor_carriers">Motor Carriers</Link>
          :
          <Aux>
            <Link className="list-group-item-action list-group-item" to="/dashboard">Dashboard</Link>
            <Link className="list-group-item-action list-group-item" to="/drivers">Drivers</Link>
            <Link className="list-group-item-action list-group-item" to="/vehicles">Trucks</Link>
            <Link className="list-group-item-action list-group-item" to="/logs">Logs</Link>
            <ListGroupItem tag="a" href="#" action>Settings</ListGroupItem>
          </Aux> }

      </ListGroup>
    </div>

  </div>
);

sidebar.propTypes = {
  isAdm: PropTypes.bool.isRequired,
};

export default sidebar;
