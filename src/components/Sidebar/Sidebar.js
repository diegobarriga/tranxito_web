import React from 'react'
import Aux from '../../hoc/Aux';
import styles from './Sidebar.css';
import { ListGroup, ListGroupItem } from 'reactstrap';

const sidebar = () => (
    
    
        <div className="sidebar">

            <div>
                <h3>Buttons </h3>
                <ListGroup>
                    <ListGroupItem tag="a" href="#" action>Dashboard</ListGroupItem>
                    <ListGroupItem className="nav-button" tag="a" href="#" action>Users</ListGroupItem>
                    <ListGroupItem tag="a" href="#" action>Trucks</ListGroupItem>
                    <ListGroupItem tag="a" href="#" action>Logs</ListGroupItem>
                    <ListGroupItem tag="a" href="#" action>Settings</ListGroupItem>
                </ListGroup>
            </div>

        </div>
    


);

export default sidebar;