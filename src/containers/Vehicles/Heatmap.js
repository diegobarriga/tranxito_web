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
import '../../assets/styles/forms.css';

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

const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`;

const HeatMapComponent = compose(
  withProps({
    googleMapURL,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '450px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withGoogleMap,
)(props => (
  <GoogleMap defaultZoom={9} center={props.center}>
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
      loading: false,
      data: null,
      center_cords: null,
      span: 'week',
    };
    this.updateSpan = this.updateSpan.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.getData();
  }

  getData() {
    this.getTrackings()
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          this.state.data = response.data;
          this.createData();
        } else {
          this.setState({ loading: false });
        }
      });
  }

  getTrackings() {
    const TODAY = Date.now();
    let nSpan = 0;
    switch (this.state.span) {
      case 'day':
        nSpan = 24 * 60 * 60 * 1000;
        break;
      case 'week':
        nSpan = 7 * 24 * 60 * 60 * 1000;
        break;
      case 'month':
        nSpan = 30 * 24 * 60 * 60 * 1000;
        break;
      default:
        nSpan = 0;
        break;
    }
    const condition = { timestamp: { gt: TODAY - nSpan } };
    console.log("condition", condition, nSpan);
    return api.vehicles.getTrackings(this.props.id, this.props.token, condition);
  }

  createData() {
    let i;
    const bound = new google.maps.LatLngBounds();
    for (i = 0; i < this.state.data.length; i += 1) {
      if (this.state.data[i]) {
        bound.extend(new google.maps.LatLng(
          this.state.data[i].coordinates.lat,
          this.state.data[i].coordinates.lng,
        ));
        this.state.trackings.push(new google.maps.LatLng(
          this.state.data[i].coordinates.lat,
          this.state.data[i].coordinates.lng,
        ));
      }
    }
    const lat = bound.getCenter().lat();
    const lng = bound.getCenter().lng();
    this.setState({ center_cords: { lat, lng }, loading: false });
  }

  async updateSpan(event) {
    console.log('old span: ', this.state.span);
    console.log('recieved span: ', event.target.value);
    // this.state.span = event.target.value;
    await this.setState({ span: event.target.value, loading: true });
    console.log('new span: ', this.state.span);
    this.getData();
  }

  render() {
    if (this.state.loading === true) return <Loader />;

    // if (this.state.trackings === null) return <div><h2>Could not load the heatmap</h2></div>;
    return (
      <div>
        <div className="inlineBoxRight paddingBottom">
          <div className="content">
            <span>Time interval </span>
            <select name="time" onChange={this.updateSpan} value={this.state.span}>
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>
          </div>
        </div>
        <HeatMapComponent
          data={this.state.trackings}
          center={this.state.center_cords}
        />
      </div>
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
