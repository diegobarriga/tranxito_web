/* global google */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Marker, InfoWindow } from 'react-google-maps';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import api from '../../services/api';

const marker1 = require('../../assets/images/truck_marker_1.svg');
const marker2 = require('../../assets/images/truck_marker_2.svg');
const marker3 = require('../../assets/images/truck_marker_3.svg');
const marker4 = require('../../assets/images/truck_marker_4.svg');

const markers = {
  1: marker1,
  2: marker2,
  3: marker3,
  4: marker4,
};

class InfoWindowMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      user: null,
      vehicle: null,
      userLoading: true,
      vehicleLoading: true,
    };
  }

  componentDidMount() {
    this.getUserInfo()
      .then((response) => {
        if (response.status === 200) {
          this.setState({ user: response.data, userLoading: false });
        } else {
          this.setState({ userLoading: false });
        }
      });

    this.getVehicle()
      .then((response) => {
        if (response.status === 200) {
          this.setState({ vehicle: response.data, vehicleLoading: false });
        } else {
          this.setState({ vehicleLoading: false });
        }
      });
  }

  getUserInfo() {
    return api.people.getUser(this.props.userId, this.props.token);
  }

  getVehicle() {
    return api.vehicles.getVehicle(this.props.vehicleId, this.props.token);
  }

  handleToggleOpen = () => {
    this.setState({
      isOpen: true,
    });
  }

  handleToggleClose = () => {
    this.setState({
      isOpen: false,
    });
  }

  render() {
    if (this.state.vehicleLoading === true || this.state.userLoading === true) return <div />;
    return (
      <Marker
        key={this.props.id}
        position={{ lat: this.props.lat, lng: this.props.lng }}
        // icon={{
        //     url: markers[this.props.eventCode],
        //     scaledSize: new google.maps.Size(40, 40),
        // }}
        onClick={() => this.handleToggleOpen()}
      >
        {
          this.state.isOpen &&
          <InfoWindow onCloseClick={() => this.handleToggleClose()}>
            <div>
              {
                this.state.vehicle != null &&
                <p><FontAwesomeIcon icon="car" /><Link to={`/vehicles/${this.state.vehicle.id}`}> {this.state.vehicle.car_maker} {this.state.vehicle.model} - {this.state.vehicle.plaque}</Link></p>
              }
              {
                this.state.user != null &&
                <p><FontAwesomeIcon icon="user" /><Link to={`/drivers/${this.state.user.id}`}> {this.state.user.first_name} {this.state.user.last_name}</Link></p>
              }
              <p><FontAwesomeIcon icon="location-arrow" /> {this.props.lat}, {this.props.lng}</p>
              <p><FontAwesomeIcon icon="clock" /> {this.props.timestamp}</p>
              <p><FontAwesomeIcon icon="tachometer-alt" /> {this.props.speed} mph</p>
            </div>
          </InfoWindow>
        }
      </Marker>
    );
  }
}

InfoWindowMarker.propTypes = {
  id: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  eventCode: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
  timestamp: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  vehicleId: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(InfoWindowMarker);
