import React from 'react';
import Aux from '../../hoc/Aux'
import { Link } from 'react-router-dom'


import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

class NaviBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  render() {
    const pStyle = {
      color: "white"            
    }; 

    const aStyle = {
      height: "75px"
    }; 

    

    return (        
      <Aux>
        <Navbar fixed="top" style={aStyle} color="dark" light expand="md">
          <NavbarBrand style={pStyle}  href="/">E2E Group</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>                
                <Link className = "nav-link" style={pStyle} to="/login">Login</Link>                
              </NavItem>
              <NavItem>
                <Link className = "nav-link" style={pStyle} to="/signup">Signup</Link> 
                
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle style={pStyle} nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem >
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </Aux>
    );
  }
}

export default NaviBar;