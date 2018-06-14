import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../assets/styles/dashboard.css';
import api from '../../services/api';
import BarChart from './BarChart';
import AlertsTable from './AlertsTable';
import Loader from '../../components/Loader/Loader';
import '../../assets/styles/forms.css';

class AlertsStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      span: 'week',
      alertsStats: null,
      loadingAlertsStats: true,
      dataAlertsHoursStats: {
        datasets: [
          {
            data: [],
            backgroundColor: '#bcd631',
            borderColor: '#bcd631',
            hoverBackgroundColor: 'rgb(119, 134, 146)',
            hoverBorderColor: 'rgb(119, 134, 146)',
            borderWidth: '2',
          },
        ],
      },
      dataAlertsSpeedStats: {
        datasets: [
          {
            data: [],
            backgroundColor: '#6b469c',
            borderColor: '#6b469c',
            hoverBackgroundColor: 'rgb(119, 134, 146)',
            hoverBorderColor: 'rgb(119, 134, 146)',
            borderWidth: '2',
          },
        ],
      },
    };
    this.setDriverAlerts = this.setDriverAlerts.bind(this);
    this.updateSpan = this.updateSpan.bind(this);
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
    console.log('using span', this.state.span);
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

    const dataAlertsSpeedStats = this.state.dataAlertsSpeedStats;
    const dataAlertsHoursStats = this.state.dataAlertsHoursStats;

    const speedLabels = [];
    const timeLabels = [];
    const speedData = [];
    const timeData = [];

    data.data.topDrivers.speedLimit.forEach((id) => {
      speedLabels.push(`${this.props.users[id].firstName.charAt(0)}. ${this.props.users[id].lastName}`);
      speedData.push(data.data.driversAlerts[id].speedLimit);
    });

    data.data.topDrivers.timeLimit.forEach((id) => {
      timeLabels.push(`${this.props.users[id].firstName.charAt(0)}. ${this.props.users[id].lastName}`);
      timeData.push(data.data.driversAlerts[id].timeLimit);
    });

    console.log('speedLabels', speedLabels);
    console.log('timeLabels', timeLabels);

    dataAlertsSpeedStats.datasets[0].data = speedData;
    dataAlertsHoursStats.datasets[0].data = timeData;

    dataAlertsSpeedStats.labels = speedLabels;
    dataAlertsHoursStats.labels = timeLabels;

    // console.log(dataAlertsStats.datasets[0].data);
    if (this.state.isMounted) {
      console.log('entro al setstate stats');
      this.setState({
        alertsStats: data.data,
        loadingAlertsStats: false,
        dataAlertsSpeedStats,
        dataAlertsHoursStats,
      });
    }
  }

  async updateSpan(event) {
    console.log('old span: ', this.state.span);
    console.log('recieved span: ', event.target.value);
    // this.state.span = event.target.value;
    await this.setState({ span: event.target.value, loadingAlertsStats: true });
    console.log('new span: ', this.state.span);
    this.getData();
  }

  render() {
    // console.log(dataAlertsStats);
    console.log('loadingAlertsStats: ', this.state.loadingAlertsStats);
    if (this.props.activeTab !== '3') return <div />;

    else if (this.state.loadingAlertsStats) return <Loader />;

    console.log(this.state.dataAlertsSpeedStats);
    console.log(this.state.dataAlertsHoursStats);
    console.log(this.state.alertsStats);

    return (
      <div className="margin">
        <div className="inlineBoxRight">
          <div className="content">
            <span>Time interval </span>
            <select name="time" onChange={this.updateSpan} value={this.state.span}>
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>
          </div>
        </div>
        <div className="barChart">
          <BarChart
            data={this.state.dataAlertsSpeedStats}
            title="Drivers with the most Speeding Alerts"
          />
          <BarChart
            data={this.state.dataAlertsHoursStats}
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
