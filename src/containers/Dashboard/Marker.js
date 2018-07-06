/* global google */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Marker, InfoWindow } from 'react-google-maps';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const marker1 = require('../../assets/images/truck_marker_1.svg');
const marker2 = require('../../assets/images/truck_marker_2.svg');
const marker3 = require('../../assets/images/truck_marker_3.svg');
const marker4 = require('../../assets/images/truck_marker_4.svg');
const marker5 = require('../../assets/images/truck_marker.svg');

const moment = require('moment');

const markers = {
  1: marker1,
  2: marker2,
  3: marker3,
  4: marker4,
  5: marker5,
};

class InfoWindowMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
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

  formatDate(datetime) {
    return moment(datetime).calendar();
  }

  render() {
    return (
      <Marker
        key={this.props.id}
        position={{ lat: this.props.lat, lng: this.props.lng }}
        icon={{
            url: markers[this.props.eventCode],
            scaledSize: new google.maps.Size(40, 40),
        }}
        onClick={() => this.handleToggleOpen()}
      >
        {
          this.state.isOpen &&
          <InfoWindow onCloseClick={() => this.handleToggleClose()}>
            <div>
              {
                this.props.vehicles[this.props.vehicleId] != null &&
                <p><FontAwesomeIcon icon="car" /><Link to={`/vehicles/${this.props.vehicles[this.props.vehicleId].id}`}> {this.props.vehicles[this.props.vehicleId].carMaker} {this.props.vehicles[this.props.vehicleId].model} - {this.props.vehicles[this.props.vehicleId].plaque}</Link></p>
              }
              {
                this.props.users[this.props.userId] != null &&
                <p><FontAwesomeIcon icon="user" /><Link to={`/drivers/${this.props.users[this.props.userId].id}`}> {this.props.users[this.props.userId].firstName} {this.props.users[this.props.userId].lastName}</Link></p>
              }
              <p><FontAwesomeIcon icon="clock" /> {this.formatDate(this.props.timestamp)}</p>
              <p><FontAwesomeIcon icon="tachometer-alt" /> {this.props.speed} mph</p>
              <p><FontAwesomeIcon icon="location-arrow" /> {this.props.lat}, {this.props.lng}</p>
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
  vehicles: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
  vehicleId: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  vehicles: state.auth.vehicles,
  users: state.auth.users,
});

export default connect(mapStateToProps)(InfoWindowMarker);
