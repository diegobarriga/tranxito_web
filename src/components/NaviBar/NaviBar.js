import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  Navbar, Nav, NavItem, UncontrolledDropdown, DropdownToggle,
  DropdownMenu, DropdownItem, NavLink,
} from 'reactstrap';
import api from '../../services/api';
import '../../assets/styles/navbar.css';

const pStyle = {
  color: 'white',
};

const path = `${process.env.PUBLIC_URL}/img/logoe2e.svg`;

class Navibar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  getUserInfo() {
    return api.people.getUser(this.props.userId, this.props.token);
  }

  render() {
    const { isAuth, userId } = this.props;

    return (
      <Navbar fixed="top" className="navbar" light expand="md">
        <img src={path} className="logo" alt="E2E Performance" />
        <Nav className="ml-auto" navbar>
          { isAuth ?
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret style={pStyle}>
                { this.state.firstName }
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavLink >Profile</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink>Settings</NavLink>
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
  }
}

Navibar.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  userId: PropTypes.number,
  token: PropTypes.string,
};

Navibar.defaultProps = {
  userId: null,
  token: null,
};

export default Navibar;
