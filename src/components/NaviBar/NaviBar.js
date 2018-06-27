import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  Navbar, Nav, NavItem, UncontrolledDropdown, DropdownToggle,
  DropdownMenu, DropdownItem, NavLink,
} from 'reactstrap';
import { translate } from 'react-i18next';
import FlagIcon from '../FlagIcon';

import api from '../../services/api';
import '../../assets/styles/navbar.css';

const pStyle = {
  color: 'white',
};

const path = `${process.env.PUBLIC_URL}/img/logoe2e.svg`;

class Navibar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'en',
    };
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  getUserInfo() {
    return api.people.getUser(this.props.userId, this.props.token);
  }

  render() {
    const { isAuth } = this.props;
    const { t, i18n } = this.props;
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
      this.setState({ language: lng });
    };

    const usFlag = this.state.language === 'en' ? <FlagIcon code="us" size="lg" className="selected-flag" /> : <FlagIcon code="us" size="lg" />;
    const mxFlag = this.state.language === 'es' ? <FlagIcon code="mx" size="lg" className="selected-flag" /> : <FlagIcon code="mx" size="lg" />;

    return (
      <Navbar fixed="top" className="navbar" light expand="md">
        <Link to="/"><img src={path} className="logo" alt="E2E Performance" /></Link>
        <div className="flags">
          <button onClick={() => changeLanguage('en')}>{usFlag}</button>
          <button onClick={() => changeLanguage('es')}>{mxFlag}</button>
        </div>
        <Nav className="ml-auto" navbar>
          { isAuth ?
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret style={pStyle}>
                { this.state.firstName }
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavLink >{t('Profile')}</NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <Link className="nav-link" to="/logout"><FontAwesomeIcon icon="sign-out-alt" />  {t('Logout')}</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            :
            <NavItem>
              <Link className="nav-link" style={pStyle} to="/"><FontAwesomeIcon icon="sign-in-alt" /> {t('Login')}</Link>
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
  t: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
};

Navibar.defaultProps = {
  userId: null,
  token: null,
};


export default translate('translations')(Navibar);
