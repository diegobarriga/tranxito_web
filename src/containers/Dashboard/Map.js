/* global google */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import { compose, withProps, withHandlers } from 'recompose';
import InfoWindowMarker from './Marker';
import Loader from '../../components/Loader/Loader';
import MapControl from './MapControl';
import Legend from './Legend';

const { MarkerClusterer } = require('react-google-maps/lib/components/addons/MarkerClusterer');

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
  <GoogleMap defaultZoom={3} center={props.cords}>
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >

      {Object.values(props.markers).map(marker => (
        marker != null &&
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
  constructor(props) {
    super(props);
    this.state = {
      center_cords: null,
      loading_cords: true,
    };
  }

  componentDidMount() {
    this.getDefaultPosition();
  }

  getDefaultPosition() {
    console.log();
    const bound = new google.maps.LatLngBounds();
    let i;
    const trackingArray = Object.values(this.props.trackings);
    for (i = 0; i < trackingArray.length; i += 1) {
      if (trackingArray[i]) {
        bound.extend(new google.maps.LatLng(
          trackingArray[i].coordinates.lat,
          trackingArray[i].coordinates.lng,
        ));
      }
      // console.log(trackingArray[i].coordinates.lat, trackingArray[i].coordinates.lng);
    }
    const lat = bound.getCenter().lat();
    const lng = bound.getCenter().lng();
    console.log(lat, lng);
    this.setState({ center_cords: { lat, lng }, loading_cords: false });
  }

  render() {
    if (this.props.isLoading === true || this.state.loading_cords === true) return <Loader />;

    return (
      <MapWithAMarkerClusterer
        markers={this.props.trackings}
        cords={this.state.center_cords}
      />
    );
  }
}


Map.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  trackings: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  token: state.auth.token,
  motorCarrierId: state.auth.motorCarrierId,
  loading: state.trackings.loading,
  isLoading: state.trackings.loading,
  trackings: state.trackings.tracking,
});

export default connect(mapStateToProps)(Map);
