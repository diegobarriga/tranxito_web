import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { EVENT_COLORS, DUTY_STATUS_LONG } from '../../utils/eventTypes';
import '../../assets/styles/dashboard.css';
import api from '../../services/api';
import BarChart from './BarChart';
import AlertsTable from './AlertsTable';
import * as functions from './functions';
import Loader from '../../components/Loader/Loader';

const dataAlertsHoursStats = {
  // labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: '#bcd631',
      borderColor: '#bcd631',
      hoverBackgroundColor: 'rgb(119, 134, 146)',
      hoverBorderColor: 'rgb(119, 134, 146)',
      borderWidth: '2',
      // xAxisID: 'Drivers',
      // yAxisID: 'Amount of Alerts',
    },
  ],
};

const dataAlertsSpeedStats = {
  // labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: '#6b469c',
      borderColor: '#6b469c',
      hoverBackgroundColor: 'rgb(119, 134, 146)',
      hoverBorderColor: 'rgb(119, 134, 146)',
      borderWidth: '2',
      // xAxisID: 'Drivers',
      // yAxisID: 'Amount of Alerts',
    },
  ],
};

class AlertsStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      span: 'week',
      alertsStats: null,
      loadingAlertsStats: true,
    };
    this.setDriverAlerts = this.setDriverAlerts.bind(this);
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
    this.getDataByFunction(api.motorCarriers.getDriverAlerts, this.setDriverAlerts);
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

  setDriverAlerts(data) {
    console.log('entro al trigger de alerts');
    const speedLabels = [];
    const timeLabels = [];
    console.log('dataaaa', data);
    data.data.topDrivers.speedLimit.forEach(id => (
      speedLabels.push(`${this.props.users[id].first_name.charAt(0)}. ${this.props.users[id].last_name}`)
    ));

    data.data.topDrivers.timeLimit.forEach(id => (
      timeLabels.push(`${this.props.users[id].first_name.charAt(0)}. ${this.props.users[id].last_name}`)
    ));

    console.log('speedLabels', speedLabels);
    console.log('timeLabels', timeLabels);

    dataAlertsSpeedStats.datasets[0].data = data.data.topDrivers.speedLimit;
    dataAlertsHoursStats.datasets[0].data = data.data.topDrivers.timeLimit;

    dataAlertsSpeedStats.labels = speedLabels;
    dataAlertsHoursStats.labels = timeLabels;
    // console.log(dataAlertsStats.datasets[0].data);
    if (this.state.isMounted) {
      console.log('entro al setstate stats');
      this.setState({ alertsStats: data.data, loadingAlertsStats: false });
    }
  }

  render() {
    // console.log(dataAlertsStats);
    console.log('loadingAlertsStats: ', this.state.loadingAlertsStats);
    if (this.props.activeTab !== '3') return <div />;

    else if (this.state.loadingAlertsStats) return <Loader />;

    return (
      <div>
        <div className="barChart">
          <BarChart
            data={dataAlertsSpeedStats}
            title="Drivers with the most Speeding Alerts"
          />
          <BarChart
            data={dataAlertsHoursStats}
            title="Drivers with the most Hours of Driving Alerts"
          />
        </div>
        <AlertsTable
          stats={this.state.alertsStats}
        />
      </div>

    );
  }
}

AlertsStats.propTypes = {
  token: PropTypes.string.isRequired,
  motorCarrierId: PropTypes.number.isRequired,
  activeTab: PropTypes.string.isRequired,
  users: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  users: state.auth.users,
  token: state.auth.token,
  motorCarrierId: state.auth.motorCarrierId,
});

export default connect(mapStateToProps)(AlertsStats);
