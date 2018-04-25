import React from 'react'
import styles from '../../assets/styles/sidebar.css';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';

const sidebar = () => (

        <div className="sidebar">
            <div>
                <h3>Buttons </h3>
                <ListGroup>
                    <Link className = "list-group-item-action list-group-item" to="/dashboard">Dashboard</Link>
                    <Link className = "list-group-item-action list-group-item" to="/users">Drivers</Link>
                    <Link className = "list-group-item-action list-group-item" to="/trucks">Trucks</Link>
                    <Link className = "list-group-item-action list-group-item" to="/logs">Logs</Link>
                    <ListGroupItem tag="a" href="#" action>Settings</ListGroupItem>
                </ListGroup>
            </div>

        </div>


);

export default sidebar;
