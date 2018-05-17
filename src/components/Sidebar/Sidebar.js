import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../assets/styles/sidebar.css';
import Aux from '../../hoc/Aux';

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

    if (name === 'dashboards') {
      this.setState({ dashboardClicked: true });
    } else if (name === 'drivers') {
      this.setState({ driversClicked: true });
    } else if (name === 'vechicles') {
      this.setState({ vehiclesClicked: true });
    }
  }

  render() {
    const vehiclesColor = this.state.vehiclesClicked ? '#dedede' : 'white';
    const driversColor = this.state.driversClicked ? '#dedede' : 'white';
    const dashboardColor = this.state.dashboardClicked ? '#dedede' : 'white';

    return (
      <div className="sidebar">
        <div>
          <ListGroup>
            {this.props.isAdm ?
              <Link className="list-group-item-action list-group-item" to="/motor_carriers">Motor Carriers</Link>
              :
              <Aux>
                <Link style={{ backgroundColor: dashboardColor }} className="list-group-item-action list-group-item sidebarBtn" to="/dashboard" onClick={() => this.changeColor('dashboards')}>Dashboard</Link>
                <Link style={{ backgroundColor: driversColor }} className="list-group-item-action list-group-item sidebarBtn" to="/drivers" onClick={() => this.changeColor('drivers')}>Drivers</Link>
                <Link style={{ backgroundColor: vehiclesColor }} className="list-group-item-action list-group-item sidebarBtn" to="/vehicles" onClick={() => this.changeColor('vechicles')}>Vehicles</Link>
                <Link className="btn list-group-item-action list-group-item disabled" onClick={e => e.preventDefault()} to="/">Devices</Link>
                <Link className="btn list-group-item-action list-group-item disabled" onClick={e => e.preventDefault()} to="/">Supervisors</Link>
              </Aux> }

          </ListGroup>
        </div>
      </div>
    );
  }
}


sidebar.propTypes = {
  isAdm: PropTypes.bool.isRequired,
};

export default sidebar;
