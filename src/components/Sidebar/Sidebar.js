import React from 'react'
import styles from '../../assets/styles/sidebar.css';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';

const sidebar = () => (

        <div className="sidebar">
            <div>
                <ListGroup>
                    <Link className = "list-group-item-action list-group-item" to="/dashboard">Dashboard</Link>
                  <Link className = "list-group-item-action list-group-item" to="/drivers">Drivers</Link>
                <Link className = "list-group-item-action list-group-item" to="/vehicles">Trucks</Link>
                    <Link className = "list-group-item-action list-group-item" to="/logs">Logs</Link>
                    <ListGroupItem tag="a" href="#" action>Settings</ListGroupItem>
                </ListGroup>
            </div>

        </div>


);

export default sidebar;
