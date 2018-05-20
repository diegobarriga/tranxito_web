/* global google */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import { compose, withProps, withHandlers } from 'recompose';
import InfoWindowMarker from './Marker';
import * as actions from '../../store/actions/tracking';
import Loader from '../../components/Loader/Loader';
import MapControl from './MapControl';
import Legend from './Legend';

const { MarkerClusterer } = require('react-google-maps/lib/components/addons/MarkerClusterer');

function getDefaultPosition(data) {
  console.log(data);
  const bound = new google.maps.LatLngBounds();
  let i;
  for (i = 0; i < data.length; i += 1) {
    bound.extend(new google.maps.LatLng(data[i].coordinates.lat, data[i].coordinates.lng));
    console.log(data[i].coordinates.lat, data[i].coordinates.lng);
  }
  const lat = bound.getCenter().lat();
  const lng = bound.getCenter().lng();
  console.log(lat, lng);
  return { lat, lng };
}

const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '450px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers();
      console.log(`Current clicked markers length: ${clickedMarkers.length}`);
      console.log(clickedMarkers);
    },
  }),
  withGoogleMap,
)(props => (
  <GoogleMap defaultZoom={1} center={getDefaultPosition(props.markers)}>
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >

      {Object.values(props.markers).map(marker => (
        <InfoWindowMarker
          key={marker.id}
          id={marker.id}
          lat={marker.coordinates.lat}
          lng={marker.coordinates.lng}
          speed={marker.speed}
          timestamp={marker.timestamp}
          userId={marker.personId}
          vehicleId={marker.vehicleId}
          eventCode={marker.eventCode ? marker.eventCode : 5}
        />
      ))}
    </MarkerClusterer>

    <MapControl position={google.maps.ControlPosition.RIGHT_CENTER}>
      <Legend />
    </MapControl>

  </GoogleMap>
));

class Map extends React.Component {
  componentDidMount() {
    this.props.getTrackings(this.props.token, this.props.motorCarrierId);

    // this.getDefaultPosition();
  }

  render() {
    if (this.props.isLoading === true) return <Loader />;

    return (
      <MapWithAMarkerClusterer markers={this.props.trackings} />
    );
  }
}


Map.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  getTrackings: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  motorCarrierId: PropTypes.number.isRequired,
  trackings: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  token: state.auth.token,
  motorCarrierId: state.auth.motorCarrierId,
  loading: state.trackings.loading,
  isLoading: state.trackings.loading,
  trackings: state.trackings.tracking,
});

const mapDispatchToProps = dispatch => ({
  getTrackings: (token, motorCarrierId) => dispatch(actions.getTrackings(token, motorCarrierId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
