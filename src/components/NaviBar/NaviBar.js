import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  Navbar, Nav, NavItem, UncontrolledDropdown, DropdownToggle,
  DropdownMenu, DropdownItem, NavLink,
} from 'reactstrap';
import '../../assets/styles/navbar.css';

const pStyle = {
  color: 'white',
};

const path = `${process.env.PUBLIC_URL}/img/logoe2e.svg`;

const navibar = props => (
  <Navbar fixed="top" className="navbar" light expand="md">
    <img src={path} className="logo" alt="E2E Performance" />
    <Nav className="ml-auto" navbar>

      { props.isAuth ?

        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret style={pStyle}>
            My Profile
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              <NavLink href="#">Profile</NavLink>
            </DropdownItem>
            <DropdownItem>
              <NavLink href="#">Settings</NavLink>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              <Link className="nav-link" to="/logout"><FontAwesomeIcon icon="sign-out-alt" />  Logout</Link>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        :
        <NavItem>
          <Link className="nav-link" style={pStyle} to="/"><FontAwesomeIcon icon="sign-in-alt" /> Login</Link>
        </NavItem> }

    </Nav>
  </Navbar>
);


navibar.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

export default navibar;
