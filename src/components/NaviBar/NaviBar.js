import React from 'react';
import { Link } from 'react-router-dom';
import {Navbar, NavbarBrand, Nav, NavItem} from 'reactstrap';
import styles from '../../assets/styles/navbar.css';

    const pStyle = {
      color: "white"
    };

    const aStyle = {
      height: "75px"
    };


const navibar = ( props ) => (
      <Navbar fixed="top" className="navbar" light expand="md">
        <NavbarBrand style={pStyle} >E2E Group</NavbarBrand>


          <Nav className="ml-auto" navbar>

            { props.isAuth
            ?<NavItem>
              <Link className = "nav-link" style={pStyle} to="/logout">Logout</Link>
            </NavItem>
            :<NavItem>
              <Link className = "nav-link" style={pStyle} to="/login">Login</Link>
            </NavItem> }

            { !props.isAuth &&
            <NavItem>
              <Link className = "nav-link" style={pStyle} to="/signup">Signup</Link>
            </NavItem> }


          </Nav>

      </Navbar>
)

export default navibar;
