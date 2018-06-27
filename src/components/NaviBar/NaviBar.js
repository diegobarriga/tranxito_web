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
  paddingTop: '0px',
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
    const changeLanguage = (lng, subLng) => {
      i18n.changeLanguage(lng);
      this.setState({ language: subLng });
    };

    const usFlag = this.state.language === 'en' ? <FlagIcon code="us" size="lg" className="selected-flag" /> : <FlagIcon code="us" size="lg" />;
    const mxFlag = this.state.language === 'mx' ? <FlagIcon code="mx" size="lg" className="selected-flag" /> : <FlagIcon code="mx" size="lg" />;
    const clFlag = this.state.language === 'cl' ? <FlagIcon code="cl" size="lg" className="selected-flag" /> : <FlagIcon code="cl" size="lg" />;

    return (
      <Navbar fixed="top" className="navbar" light expand="md">
        <div className="nav-left">
          <Link to="/"><img src={path} className="logo" alt="E2E Performance" /></Link>
        </div>
        <div className="nav-right">
          <div className="flags">
            <button onClick={() => changeLanguage('en', 'en')}>{usFlag}</button>
            <button onClick={() => changeLanguage('es', 'mx')}>{mxFlag}</button>
            <button onClick={() => changeLanguage('es', 'cl')}>{clFlag}</button>
          </div>
          { isAuth ?
            <Link className="nav-link" style={pStyle} to="/logout"><FontAwesomeIcon icon="sign-out-alt" />  {t('Logout')}</Link>
            :
            <Link className="nav-link" style={pStyle} to="/"><FontAwesomeIcon icon="sign-in-alt" /> {t('Login')}</Link>
          }
        </div>
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
