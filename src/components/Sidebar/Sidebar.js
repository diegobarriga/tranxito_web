import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'reactstrap';
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
            <Link className="list-group-item-action list-group-item disabledCursor" onClick={e => e.preventDefault()} to="/dashboard">Dashboard</Link>
            <Link className="list-group-item-action list-group-item" to="/drivers">Drivers</Link>
            <Link className="list-group-item-action list-group-item" to="/vehicles">Vehicles</Link>
            <Link className="list-group-item-action list-group-item disabledCursor" onClick={e => e.preventDefault()} to="/logs">Alerts</Link>
          </Aux> }

      </ListGroup>
    </div>

  </div>
);

sidebar.propTypes = {
  isAdm: PropTypes.bool.isRequired,
};

export default sidebar;
