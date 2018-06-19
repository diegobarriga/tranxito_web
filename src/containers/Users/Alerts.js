import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../assets/styles/dashboard.css';
import api from '../../services/api';
import LineChart from '../Charts/LineChart';
import Loader from '../../components/Loader/Loader';
import AlertsTable from './AlertsTable';
import '../../assets/styles/forms.css';

const moment = require('moment');
const _ = require('lodash');

class Alerts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      span: 'month',
      alerts: [],
      dataStats: {
        datasets: [
          {
            lineTension: 0,
            data: [],
            // label: 'My First dataset',
            fill: false,
            backgroundColor: 'rgba(107, 70, 156, 0.4)',
            borderColor: 'rgba(107, 70, 156, 1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(107, 70, 156, 1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(107, 70, 156, 1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
          },
        ],
        labels: [],
      },
    };
    this.groupData = this.groupData.bind(this);
    this.updateSpan = this.updateSpan.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true, isMounted: true });
    console.log("didmount");
    this.getData();
  }

  componentWillUnmount() {
    this.setState({
      isMounted: false,
    })
  }

  getData() {
    this.getTrackings()
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          this.groupData(response.data);
        } else {
          if (this.state.isMounted) {
            this.setState({ loading: false });
          }
        }
      });
  }

  getTrackings() {
    const TODAY = Date.now();
    const nSpan = this.getSpan();

    const condition = {
      and:
      [{ timestamp: { gt: TODAY - nSpan } },
        { or: [{ speedLimitExceeded: true }, { driveTimeExceeded: true }] }],
    };
    console.log('condition', condition);
    return api.people.getTrackings(this.props.id, this.props.token, condition);
  }

  getSpan() {
    let nSpan = 0;
    switch (this.state.span) {
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
    return nSpan;
  }


  groupData(data) {
    const { dataStats } = this.state;
    const speedData = [];
    const timeData = [];
    const alerts = [];

    const groupedSpeedResults = _.countBy(_.filter(data, ['speedLimitExceeded', true]), result => moment(result.timestamp).startOf('day'));
    console.log(groupedSpeedResults);
    const groupedTimeResults = _.countBy(_.filter(data, ['driveTimeExceeded', true]), result => moment(result.timestamp).startOf('day'));
    console.log(groupedTimeResults);

    const groupedAlerts = _.groupBy(data, result => moment(result.timestamp).startOf('day'));
    console.log(groupedAlerts);

    Object.keys(groupedResults).forEach((key) => {
      const obj = {
        x: new Date(key),
        y: groupedResults[key],
      };
      lineData.push(obj);
      // dataStats.labels.push(new Date(key));
    });

    Object.keys(groupedAlerts).forEach((key) => {
      const obj = {
        timestamp: new Date(key),
        speedLimit: _.sumBy(groupedAlerts[key], i => (i.speedLimitExceeded === true ? 1 : 0)),
        timeLimit: _.sumBy(groupedAlerts[key], i => (i.driveTimeExceeded === true ? 1 : 0)),
      };
      alerts.push(obj);
      // dataStats.labels.push(new Date(key));
    });
    console.log('aleerts', alerts);
    const orderedData = _.sortBy(lineData, 'x');
    // orderedData.unshift({ x: moment(Date.now() - this.getSpan()).format(), y: 0 });
    dataStats.datasets[0].data = orderedData;

    console.log(orderedData);

    if (this.state.isMounted) {
      this.setState({
        dataStats,
        loading: false,
        alerts,
      });
    }

    // if (this.state.isMounted) {
    //   console.log('entro al setstate stats');
    //   this.setState({
    //     alertsStats: data.data,
    //     loadingAlertsStats: false,
    //     dataAlertsSpeedStats,
    //     dataAlertsHoursStats,
    //   });
    // }
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
    // console.log(dataAlertsStats);
    // console.log('loadingAlertsStats: ', this.state.loadingAlertsStats);
    if (this.props.activeTab !== '3') return <div />;

    else if (this.state.loading) return <Loader />;

    const yMax = Math.max(...this.state.dataStats.datasets[0].data.map(o => o.y));
    console.log('alerts', this.state.alerts);
    return (
      <div className="margin">
        <div className="inlineBoxRight">
          <div className="content">
            <span>Time interval </span>
            <select name="time" onChange={this.updateSpan} value={this.state.span}>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>
          </div>
        </div>
        <div className="barChart">
          <LineChart
            data={this.state.dataStats}
            title="Evolution of alerts"
            yMax={yMax}
          />
        </div>
        <AlertsTable
          stats={this.state.alerts}
        />
      </div>

    );
  }
}

Alerts.propTypes = {
  token: PropTypes.string.isRequired,
  activeTab: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  // users: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  // users: state.auth.users,
  token: state.auth.token,
  // motorCarrierId: state.auth.motorCarrierId,
});

export default connect(mapStateToProps)(Alerts);
