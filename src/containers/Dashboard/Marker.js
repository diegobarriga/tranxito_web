/* global google */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Marker, InfoWindow } from 'react-google-maps';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Loader from '../../components/Loader/Loader';
import * as userActions from '../../store/actions/userInfo';
import * as vehicleActions from '../../store/actions/vehicle';

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

  componentDidMount() {
    this.props.getUserInfo(this.props.token, this.props.userId);
    this.props.getVehicle(this.props.token, this.props.vehicleId);
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
    if (this.props.vehicleLoading === true || this.props.userLoading === true) return <div />;
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
              <p><FontAwesomeIcon icon="car" /> {this.props.vehicle.car_maker} {this.props.vehicle.model} - {this.props.vehicle.plaque}</p>
              <p><FontAwesomeIcon icon="user" /><Link to={`/drivers/${this.props.userId}`}> {this.props.user.first_name} {this.props.user.last_name}</Link></p>
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
  user: PropTypes.object,
  vehicleId: PropTypes.number.isRequired,
  vehicle: PropTypes.object,
  token: PropTypes.string.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  getVehicle: PropTypes.func.isRequired,
  userLoading: PropTypes.bool.isRequired,
  vehicleLoading: PropTypes.bool.isRequired,
};

InfoWindowMarker.defaultProps = {
  user: null,
  vehicle: null,
};

const mapStateToProps = state => ({
  token: state.auth.token,
  userLoading: state.userInfo.loading,
  user: state.userInfo.user,
  vehicle: state.vehicle.vehicle,
  vehicleLoading: state.vehicle.loading,
});

const mapDispatchToProps = dispatch => ({
  getUserInfo: (token, UserId) => dispatch(userActions.getUserInfo(token, UserId)),
  getVehicle: (token, vehicleId) => dispatch(vehicleActions.getVehicle(token, vehicleId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoWindowMarker);
