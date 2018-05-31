import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { ListGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../assets/styles/sidebar.css';
import Aux from '../../hoc/Aux';
import UserView from './UserView';

class sidebar extends Component {
  state = {
    dashboardClicked: false,
    driversClicked: false,
    vehiclesClicked: false,
  }

  changeColor(name) {
    // Unmark all
    this.setState({ dashboardClicked: false });
    this.setState({ driversClicked: false });
    this.setState({ vehiclesClicked: false });
    this.setState({ supervisorsClicked: false });

    if (name === 'dashboards') {
      this.setState({ dashboardClicked: true });
    } else if (name === 'drivers') {
      this.setState({ driversClicked: true });
    } else if (name === 'vechicles') {
      this.setState({ vehiclesClicked: true });
    } else if (name === 'supervisors') {
      this.setState({ supervisorsClicked: true });
    }
  }

  render() {
    const vehiclesColor = this.state.vehiclesClicked ? '#dedede' : 'white';
    const driversColor = this.state.driversClicked ? '#dedede' : 'white';
    const dashboardColor = this.state.dashboardClicked ? '#dedede' : 'white';
    const supervisorsColor = this.state.supervisorsClicked ? '#dedede' : 'white';

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
                <Link style={{ backgroundColor: dashboardColor }} className="list-group-item-action list-group-item sidebarBtn" to="/dashboard" onClick={() => this.changeColor('dashboards')}><FontAwesomeIcon icon="chart-line" /> Dashboard</Link>
                <Link style={{ backgroundColor: driversColor }} className="list-group-item-action list-group-item sidebarBtn" to="/drivers" onClick={() => this.changeColor('drivers')}><FontAwesomeIcon icon="user" /> Drivers</Link>
                <Link style={{ backgroundColor: vehiclesColor }} className="list-group-item-action list-group-item sidebarBtn" to="/vehicles" onClick={() => this.changeColor('vechicles')}><FontAwesomeIcon icon="car" /> Vehicles</Link>
                <Link className="btn list-group-item-action list-group-item disabled" onClick={e => e.preventDefault()} to="/"><FontAwesomeIcon icon={['fab', 'bluetooth']} /> Devices</Link>
                <Link style={{ backgroundColor: supervisorsColor }} className="btn list-group-item-action list-group-item" to="/supervisors" onClick={() => this.changeColor('supervisors')}><FontAwesomeIcon icon="user-cog" /> Supervisors</Link>
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
};

export default sidebar;
