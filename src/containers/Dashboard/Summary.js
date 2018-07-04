import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { translate } from 'react-i18next';
// import { Marker, InfoWindow } from 'react-google-maps';
// import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import '../../assets/styles/dashboard.css';
import api from '../../services/api';
import { DUTY_STATUS_LONG } from '../../utils/eventTypes';

const icon1 = require('../../assets/images/truck_icon_1.svg');
const icon2 = require('../../assets/images/truck_icon_2.svg');
const icon3 = require('../../assets/images/truck_icon_3.svg');
const icon4 = require('../../assets/images/truck_icon_4.svg');
const icon5 = require('../../assets/images/truck_icon.svg');

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      numberSP: null,
      loading: true,
      numberUsers: null,
      numberTrucks: null,
      numberPerDutyStatus: null,
    };
  }

  componentDidMount() {
    this.setState({
      isMounted: true,
    })
    this.getMetrics();
  }

  componentWillUnmount() {
    this.setState({
      isMounted: false,
    })
  }

  getMetrics() {
    const numberUsers = this.getNumberUsers();
    const numberTrucks = this.getNumberTrucks();
    const numberPerDutyStatus = this.getNumberPerDutyStatus();

    this.getNumberSP()
      .then((response) => {
        if (response.status === 200) {
          if (this.state.isMounted) {
            this.setState({
              numberSP: response.data.count,
              loading: false,
              numberUsers,
              numberTrucks,
              numberPerDutyStatus,
            });
          }
        } else {
          if (this.state.isMounted) {
            this.setState({
              loading: false,
              numberUsers,
              numberTrucks,
              numberPerDutyStatus,
            });
          }
        }
      });
  }

  getNumberSP() {
    return api.motorCarriers.countMotorCarrierSP(this.props.motorCarrierId, this.props.token);
  }

  getNumberUsers() {
    // console.log(Object.keys(this.props.users).length);
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
      if (value && value.eventCode != null) {
        numberPerDutyStatus[value.eventCode] += 1;
      } else {
        numberPerDutyStatus[5] += 1;
      }
    }

    return numberPerDutyStatus;
  }

  render() {
    if (this.state.loading === true) return <div />;
    const { t } = this.props;
    return (
      <div className="summary">

        <a data-tip data-for="sp"> <p><FontAwesomeIcon icon="user-cog" />: {this.state.numberSP}</p></a>
        <ReactTooltip id="sp" type="info" effect="solid" className="tooltip">
          <span>{t('Amount of Support Personnels')}</span>
        </ReactTooltip>

        <a data-tip data-for="drivers"><p><FontAwesomeIcon icon="user" />: {this.state.numberUsers - this.state.numberSP}</p></a>
        <ReactTooltip id="drivers" type="info" effect="solid" className="tooltip">
          <span>{t('Amount of Drivers')}</span>
        </ReactTooltip>

        <a data-tip data-for="vehicles"><p><FontAwesomeIcon icon="car" />: {this.state.numberTrucks}</p></a>
        <ReactTooltip id="vehicles" type="info" effect="solid" className="tooltip">
          <span>{t('Amount of Vehicles')}</span>
        </ReactTooltip>

        <a data-tip data-for="d1"><p><img src={icon1} alt="OC2" height="20" width="20" />: {this.state.numberPerDutyStatus[1]}</p></a>
        <ReactTooltip id="d1" type="info" effect="solid" className="tooltip">
          <span>{t(`Amount of vehicles ${DUTY_STATUS_LONG[1].toLowerCase()}`)}</span>
        </ReactTooltip>

        <a data-tip data-for="d2"><p><img src={icon2} alt="OC2" height="20" width="20" />: {this.state.numberPerDutyStatus[2]}</p></a>
        <ReactTooltip id="d2" type="info" effect="solid" className="tooltip">
          <span>{t(`Amount of vehicles in ${DUTY_STATUS_LONG[2].toLowerCase()}`)}</span>
        </ReactTooltip>

        <a data-tip data-for="d3"><p><img src={icon3} alt="OC2" height="20" width="20" />: {this.state.numberPerDutyStatus[3]}</p></a>
        <ReactTooltip id="d3" type="info" effect="solid" className="tooltip">
          <span>{t(`Amount of vehicles ${DUTY_STATUS_LONG[3].toLowerCase()}`)}</span>
        </ReactTooltip>

        <a data-tip data-for="d4"><p><img src={icon4} alt="OC2" height="20" width="20" />: {this.state.numberPerDutyStatus[4]}</p></a>
        <ReactTooltip id="d4" type="info" effect="solid" className="tooltip">
          <span>{t(`Amount of vehicles ${DUTY_STATUS_LONG[4].toLowerCase()}`)}</span>
        </ReactTooltip>

        <a data-tip data-for="d5"><p><img src={icon5} alt="OC2" height="20" width="20" />: {this.state.numberPerDutyStatus[5]}</p></a>
        <ReactTooltip id="d5" type="info" effect="solid" className="tooltip">
          <span>{t(`Amount of vehicles ${DUTY_STATUS_LONG[5].toLowerCase()}`)}</span>
        </ReactTooltip>
      </div>
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

const translateFunc = translate('translations')(Summary);
export default connect(mapStateToProps)(translateFunc);
