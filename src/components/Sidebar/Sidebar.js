import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { ListGroup } from 'reactstrap';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import '../../assets/styles/sidebar.css';
import * as actions from '../../store/actions/index';
import Aux from '../../hoc/Aux';
import UserView from './UserView';

class sidebar extends Component {
  changeColor(name) {
    // Unmark all
    this.props.updateSidebar('dashboard', false);
    this.props.updateSidebar('drivers', false);
    this.props.updateSidebar('vehicles', false);
    this.props.updateSidebar('supervisors', false);

    if (name === 'dashboards') {
      this.props.updateSidebar('dashboard', true);
      this.props.newBreadCrumb('dashboard', true, '/dashboard');
    } else if (name === 'drivers') {
      this.props.updateSidebar('drivers', true);
      this.props.newBreadCrumb('drivers', true, '/drivers');
    } else if (name === 'vechicles') {
      this.props.updateSidebar('vehicles', true);
      this.props.newBreadCrumb('vehicles', true, '/vehicles');
    } else if (name === 'supervisors') {
      this.props.updateSidebar('supervisors', true);
      this.props.newBreadCrumb('supervisors', true, '/supervisors');
    }
  }

  render() {
    const vehiclesColor = this.props.sidebarState.vehiclesClicked ? '#dedede' : 'white';
    const driversColor = this.props.sidebarState.driversClicked ? '#dedede' : 'white';
    const dashboardColor = this.props.sidebarState.dashboardClicked ? '#dedede' : 'white';
    const supervisorsColor = this.props.sidebarState.supervisorsClicked ? '#dedede' : 'white';

    const { t } = this.props;
    return (
      <div className="sidebar">
        <div>
          <ListGroup>
            {this.props.isAdm ?
              <Aux>
                <UserView
                  image={this.props.profileImage}
                  isAdm={this.props.isAdm}
                  name={this.props.name}
                  last={this.props.last}
                  mc={this.props.mc}
                />
                <Link className="list-group-item-action list-group-item" to="/motor_carriers">Motor Carriers</Link>
              </Aux>
              :
              <Aux>
                <UserView
                  image={this.props.profileImage}
                  isAdm={this.props.isAdm}
                  name={this.props.name}
                  last={this.props.last}
                  mc={this.props.mc}
                />
                <Link style={{ backgroundColor: dashboardColor }} className="list-group-item-action list-group-item sidebarBtn" to="/dashboard" onClick={() => this.changeColor('dashboards')}><FontAwesomeIcon icon="chart-line" /> {t('Dashboard')}</Link>
                <Link style={{ backgroundColor: driversColor }} className="list-group-item-action list-group-item sidebarBtn" to="/drivers" onClick={() => this.changeColor('drivers')}><FontAwesomeIcon icon="user" /> {t('Drivers')}</Link>
                <Link style={{ backgroundColor: vehiclesColor }} className="list-group-item-action list-group-item sidebarBtn" to="/vehicles" onClick={() => this.changeColor('vechicles')}><FontAwesomeIcon icon="car" /> {t('Vehicles')}</Link>
                <Link className="btn list-group-item-action list-group-item disabled" onClick={e => e.preventDefault()} to="/"><FontAwesomeIcon icon={['fab', 'bluetooth']} /> {t('Devices')}</Link>
                <Link style={{ backgroundColor: supervisorsColor }} className="btn list-group-item-action list-group-item" to="/supervisors" onClick={() => this.changeColor('supervisors')}><FontAwesomeIcon icon="user-cog" /> {t('Supervisors')}</Link>
              </Aux> }
          </ListGroup>
        </div>
      </div>
    );
  }
}


sidebar.propTypes = {
  isAdm: PropTypes.bool.isRequired,
  profileImage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  last: PropTypes.string.isRequired,
  mc: PropTypes.string.isRequired,
  newBreadCrumb: PropTypes.func.isRequired,
  updateSidebar: PropTypes.func.isRequired,
  sidebarState: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  newBreadCrumb: (urlString, restart, url) => dispatch(actions.addNewBreadCrumb(
    urlString,
    restart,
    url,
  )),
  updateSidebar: (tabName, clicked) => dispatch(actions.updateSidebarState(tabName, clicked)),
});

const mapStateToProps = state => ({
  sidebarState: state.sidebar,
});

const translateFunc = translate('translations')(sidebar);
export default connect(mapStateToProps, mapDispatchToProps)(translateFunc);
