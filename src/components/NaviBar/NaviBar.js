import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import '../../assets/styles/navbar.css';

const pStyle = {
  color: 'white',
};

const navibar = props => (
  <Navbar fixed="top" className="navbar" light expand="md">
    <NavbarBrand style={pStyle} >E2E Group</NavbarBrand>
    <Nav className="ml-auto" navbar>

      { props.isAuth ?
        <NavItem>
          <Link className="nav-link" style={pStyle} to="/logout">Logout</Link>
        </NavItem>
        :
        <NavItem>
          <Link className="nav-link" style={pStyle} to="/login">Login</Link>
        </NavItem> }

    </Nav>
  </Navbar>
);


navibar.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

export default navibar;
