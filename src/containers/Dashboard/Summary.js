import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Marker, InfoWindow } from 'react-google-maps';
// import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import '../../assets/styles/dashboard.css';
import api from '../../services/api';

const icon1 = require('../../assets/images/truck_icon_1.svg');
const icon2 = require('../../assets/images/truck_icon_2.svg');
const icon3 = require('../../assets/images/truck_icon_3.svg');
const icon4 = require('../../assets/images/truck_icon_4.svg');
const icon5 = require('../../assets/images/truck_icon.svg');

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberSP: null,
      loading: true,
      numberDrivers: null,
      numberTrucks: null,
      numberPerDutyStatus: null,
    };
  }

  componentDidMount() {
    const numberDrivers = this.getNumberDrivers();
    const numberTrucks = this.getNumberTrucks();
    const numberPerDutyStatus = this.getNumberPerDutyStatus();
    console.log("didmount", numberPerDutyStatus);

    this.getNumberSP()
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            numberSP: response.data.count,
            loading: false,
            numberDrivers,
            numberTrucks,
            numberPerDutyStatus,
          });
        } else {
          this.setState({
            loading: false,
            numberDrivers,
            numberTrucks,
            numberPerDutyStatus,
          });
        }
      });
  }

  getNumberSP() {
    return api.motorCarriers.countMotorCarrierSP(this.props.motorCarrierId, this.props.token);
  }

  getNumberDrivers() {
    console.log(Object.keys(this.props.users).length);
    return Object.keys(this.props.users).length;
  }

  getNumberTrucks() {
    return Object.keys(this.props.vehicles).length;
  }

  getNumberPerDutyStatus() {
    console.log(this.props.trackings);
    const numberPerDutyStatus = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    const trackingArray = Object.values(this.props.trackings);
    for (let i = 0; i < trackingArray.length; i += 1) {
      const value = trackingArray[i];
      if (value.eventCode != null) {
        numberPerDutyStatus[value.eventCode] += 1;
      } else {
        numberPerDutyStatus[5] += 1;
      }
    }

    return numberPerDutyStatus;
  }

  render() {
    if (this.state.loading === true) return <div />;

    return (
      <div className="summary">
        <p><FontAwesomeIcon icon="user-cog" />: {this.state.numberSP}</p>
        <p><FontAwesomeIcon icon="user" />: {this.state.numberDrivers}</p>
        <p><FontAwesomeIcon icon="car" />: {this.state.numberTrucks}</p>
        <p><img src={icon1} alt="OC2" height="20" width="20" />: {this.state.numberPerDutyStatus[1]}</p>
        <p><img src={icon2} alt="OC2" height="20" width="20" />: {this.state.numberPerDutyStatus[2]}</p>
        <p><img src={icon3} alt="OC2" height="20" width="20" />: {this.state.numberPerDutyStatus[3]}</p>
        <p><img src={icon4} alt="OC2" height="20" width="20" />: {this.state.numberPerDutyStatus[4]}</p>
        <p><img src={icon5} alt="OC2" height="20" width="20" />: {this.state.numberPerDutyStatus[5]}</p>
      </div>
      // <div className="summary">
      //   <p><FontAwesomeIcon icon="user-cog" />: 0</p>
      //   <p><FontAwesomeIcon icon="user" />: 0</p>
      //   <p><FontAwesomeIcon icon="car" />: 0</p>
      //   <p><img src={icon1} alt="OC2" height="20" width="20" />: 0</p>
      //   <p><img src={icon2} alt="OC2" height="20" width="20" />: 0</p>
      //   <p><img src={icon3} alt="OC2" height="20" width="20" />: 0</p>
      //   <p><img src={icon4} alt="OC2" height="20" width="20" />: 0</p>
      //   <p><img src={icon5} alt="OC2" height="20" width="20" />: 0</p>
      // </div>
    );
  }
}

Summary.propTypes = {
  vehicles: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  trackings: PropTypes.object.isRequired,
  motorCarrierId: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  vehicles: state.auth.vehicles,
  users: state.auth.users,
  trackings: state.trackings.tracking,
  motorCarrierId: state.auth.motorCarrierId,
  token: state.auth.token,
});

export default connect(mapStateToProps)(Summary);
