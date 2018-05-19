/* global google */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import HeatmapLayer from 'react-google-maps/lib/components/visualization/HeatmapLayer';
import { compose, withProps } from 'recompose';
import api from '../../services/api';
// import * as actions from '../../store/actions/tracking';
import Loader from '../../components/Loader/Loader';

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
      data={props.data}
    />
  </GoogleMap>
));

class HeatMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trackings: [],
      loading: true,
      data: null,
    };
  }

  componentDidMount() {
    this.getTrackings()
      .then((response) => {
        if (response.status === 200) {
          this.state.data = response.data;
          this.createData();
          this.setState({ loading: false });
        } else {
          this.setState({ loading: false });
        }
      });
  }

  getTrackings() {
    return api.vehicles.getTrackings(this.props.id, this.props.token);
  }

  createData() {
    let i;
    for (i = 0; i < this.state.data.length; i += 1) {
      console.log(this.state.data[i].coordinates.lat, this.state.data[i].coordinates.lng);
      this.state.trackings.push(new google.maps.LatLng(
        this.state.data[i].coordinates.lat,
        this.state.data[i].coordinates.lng,
      ));
    }
  }

  render() {
    if (this.state.loading === true) return <Loader />;

    // if (this.state.trackings === null) return <div><h2>Could not load the heatmap</h2></div>;
    return (
      <HeatMapComponent data={this.state.trackings} />
    );
  }
}

HeatMap.propTypes = {
  token: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};


const mapStateToProps = state => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(HeatMap);
