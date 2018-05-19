/* global google */

import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import HeatmapLayer from 'react-google-maps/lib/components/visualization/HeatmapLayer';
import { compose, withProps } from 'recompose';
// import * as actions from '../../store/actions/tracking';
// import Loader from '../../components/Loader/Loader';

// function getDefaultPosition(data) {
//   console.log(data);
//   const bound = new google.maps.LatLngBounds();
//   let i;
//   for (i = 0; i < data.length; i += 1) {
//     bound.extend(new google.maps.LatLng(data[i].coordinates.lat, data[i].coordinates.lng));
//     console.log(data[i].coordinates.lat, data[i].coordinates.lng);
//   }
//   const lat = bound.getCenter().lat();
//   const lng = bound.getCenter().lng();
//   console.log(lat, lng);
//   return { lat, lng };
// }

const HeatMapComponent = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '450px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withGoogleMap,
)(props => (
  <GoogleMap defaultZoom={10} center={{ lat: 37.782551, lng: -122.445368 }}>
    <HeatmapLayer
      data={[
          new google.maps.LatLng(37.782551, -122.445368),
          new google.maps.LatLng(37.782745, -122.444586),
          new google.maps.LatLng(37.782842, -122.443688),
          new google.maps.LatLng(37.782919, -122.442815),
          new google.maps.LatLng(37.782992, -122.442112),
          new google.maps.LatLng(37.783100, -122.441461),
      ]}
    />
  </GoogleMap>
));

class HeatMap extends React.Component {
  componentDidMount() {
    console.log('entro aca');
    // this.getDefaultPosition();
  }
  render() {
    return (
      <HeatMapComponent />
    );
  }
}

export default HeatMap;
