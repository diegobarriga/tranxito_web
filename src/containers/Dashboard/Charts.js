import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { EVENT_COLORS, DUTY_STATUS_LONG } from '../../utils/eventTypes';
import '../../assets/styles/legend.css';
import api from '../../services/api';
import DoughnutChart from './DoughnutChart';
import SimpleTable from './SimpleTable';
import * as functions from './functions';
import Loader from '../../components/Loader/Loader';

const dataDutyStats = {
  labels: [
    DUTY_STATUS_LONG[1], DUTY_STATUS_LONG[2], DUTY_STATUS_LONG[3], DUTY_STATUS_LONG[4],
  ],
  datasets: [
    {
      data: [],
      backgroundColor: [
        EVENT_COLORS[1], EVENT_COLORS[2], EVENT_COLORS[3], EVENT_COLORS[4],
      ],
      hoverBackgroundColor: [
        EVENT_COLORS[1],
        EVENT_COLORS[2],
        EVENT_COLORS[3],
        EVENT_COLORS[4]],
    },
  ],
};

class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      span: 'week',
      vehiclesDutyStats: null,
      loadingVehiclesDutyStats: true,
      driversDutyStats: null,
      loadingDriversDutyStats: true,
      dutyStats: null,
      loadingDutyStats: true,
    };
    this.setDutyStats = this.setDutyStats.bind(this);
    this.setDriversDutyStats = this.setDriversDutyStats.bind(this);
    this.setVehiclesDutyStats = this.setVehiclesDutyStats.bind(this);
  }

  componentDidMount() {
    this.setState({
      isMounted: true,
    })
    console.log("didmount");
    this.getData();
  }

  componentWillUnmount() {
    this.setState({
      isMounted: false,
    })
  }

  getData() {
    // this.getDataByFunction(api.motorCarriers.getDriverAlerts, this.setDriverAlerts);
    this.getDataByFunction(api.motorCarriers.getDutyStats, this.setDutyStats);
    this.getDataByFunction(api.motorCarriers.getDriversDutyStats, this.setDriversDutyStats);
    // this.getDataByFunction(api.motorCarriers.getVehiclesDutyStats, this.setVehiclesDutyStats);
  }

  getDataByFunction(method, trigger) {
    method(this.props.motorCarrierId, this.props.token, this.state.span)
      .then((response) => {
        console.log(response);
        trigger(response.data);
      })
      .catch((error) => {
        console.log(error.message);
        if (this.state.isMounted) {
          this.setState({ loading: false });
        }
      });
  }

  setVehiclesDutyStats(data) {
    if (this.state.isMounted) {
      this.setState({ vehiclesDutyStats: data.data, loadingVehiclesDutyStats: false });
    }
  }

  setDriversDutyStats(data) {
    console.log("entro al trigger de drvier");
    if (this.state.isMounted) {
      console.log('entro al setstate drviers');
      this.setState({ driversDutyStats: data.data, loadingDriversDutyStats: false });
    }
  }

  setDutyStats(data) {
    console.log("entro al trigger de duty");
    dataDutyStats.datasets[0].data = [
      functions.round(data.data[1]),
      functions.round(data.data[2]),
      functions.round(data.data[3]),
      functions.round(data.data[4])
    ];
    console.log(dataDutyStats.datasets[0].data);
    if (this.state.isMounted) {
      console.log('entro al setstate stats');
      this.setState({ dutyStats: data, loadingDutyStats: false });
    }
  }

  render() {
    console.log(dataDutyStats);
    console.log('loadingduty: ', this.state.loadingDutyStats, 'loadingDrivers', this.state.loadingDriversDutyStats, 'activetab: ', this.props.activeTab);
    if (this.props.activeTab !== '2') return <div />;

    else if (
      this.state.loadingDriversDutyStats ||
      this.state.loadingDutyStats
      // this.state.loadingVehiclesDutyStats ||
    ) return <Loader />;

    console.log(dataDutyStats);
    console.log('driversDutyStats', this.state.driversDutyStats);
    return (
      <div className="doughnutChart">
        <DoughnutChart
          data={dataDutyStats}
          title="Accumulated Duty Status per Type"
        />
        <SimpleTable
          type="Drivers"
          stats={this.state.driversDutyStats}
        />
      </div>

    );
  }
}

Charts.propTypes = {
  token: PropTypes.string.isRequired,
  motorCarrierId: PropTypes.number.isRequired,
  activeTab: PropTypes.string.isRequired,

};

const mapStateToProps = state => ({
  token: state.auth.token,
  motorCarrierId: state.auth.motorCarrierId,
});

export default connect(mapStateToProps)(Charts);
