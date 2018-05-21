/* global google */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Marker, InfoWindow } from 'react-google-maps';
// import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import '../../assets/styles/dashboard.css';

const icon1 = require('../../assets/images/truck_icon_1.svg');
const icon2 = require('../../assets/images/truck_icon_2.svg');
const icon3 = require('../../assets/images/truck_icon_3.svg');
const icon4 = require('../../assets/images/truck_icon_4.svg');
const icon5 = require('../../assets/images/truck_icon.svg');

class Summary extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    // if (this.state.vehicleLoading === true || this.state.userLoading === true) return <div />;
    return (
      <div className="summary">
        <p><FontAwesomeIcon icon="user-cog" />: 10</p>
        <p><FontAwesomeIcon icon="user" />: 10</p>
        <p><FontAwesomeIcon icon="car" />: 59</p>
        <p><img src={icon1} alt="OC2" height="20" width="20" />: 10</p>
        <p><img src={icon2} alt="OC2" height="20" width="20" />: 10</p>
        <p><img src={icon3} alt="OC2" height="20" width="20" />: 10</p>
        <p><img src={icon4} alt="OC2" height="20" width="20" />: 10</p>
        <p><img src={icon5} alt="OC2" height="20" width="20" />: 5</p>
      </div>
    );
  }
}

Summary.propTypes = {
  vehicles: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  vehicles: state.auth.vehicles,
  users: state.auth.users,
});

export default connect(mapStateToProps)(Summary);
