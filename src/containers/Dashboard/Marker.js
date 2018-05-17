/* global google */

import React, { Component } from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

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
              <p><FontAwesomeIcon icon="car" />{this.props.id}</p>
              <p><FontAwesomeIcon icon="location-arrow" />{this.props.lat}, {this.props.lng}</p>
              <p><FontAwesomeIcon icon="clock" />{this.props.timestamp}</p>
              <p><FontAwesomeIcon icon="tachometer-alt" />{this.props.speed} mph</p>
              <p><FontAwesomeIcon icon="user" />{this.props.person}</p>
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
  person: PropTypes.number.isRequired,
  vehicle: PropTypes.number.isRequired,
};

export default InfoWindowMarker;
