/* global google */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import HeatmapLayer from 'react-google-maps/lib/components/visualization/HeatmapLayer';
import { compose, withProps } from 'recompose';
import { translate } from 'react-i18next';
import api from '../../services/api';
import Loader from '../../components/Loader/Loader';
import '../../assets/styles/forms.css';

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
    await this.setState({ span: event.target.value, loading: true });

    this.getData();
  }
  render() {
    if (this.state.loading === true) return <Loader />;

    const { t } = this.props;
    return (
      <div>
        <div className="inlineBoxRight paddingBottom">
          <div className="content">
            <span>{t('Time interval')} </span>
            <select name="time" onChange={this.updateSpan} value={this.state.span}>
              <option value="day">{t('Day')}</option>
              <option value="week">{t('Week')}</option>
              <option value="month">{t('Month')}</option>
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

const translateFunc = translate('translations')(HeatMap);
export default connect(mapStateToProps)(translateFunc);
