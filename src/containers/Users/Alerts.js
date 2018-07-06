import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
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
      groupedAlerts: {},
      dataStats: {
        speed: {
          datasets: [
            {
              lineTension: 0,
              data: [],
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
        time: {
          datasets: [
            {
              lineTension: 0,
              data: [],
              fill: false,
              backgroundColor: 'rgba(188, 214, 49, 0.4)',
              borderColor: 'rgba(188, 214, 49, 1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(188, 214, 49, 1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(188, 214, 49, 1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 4,
              pointHitRadius: 10,
            },
          ],
          labels: [],
        },
      },
    };
    this.groupData = this.groupData.bind(this);
    this.updateSpan = this.updateSpan.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true, isMounted: true });

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
    const groupedTimeResults = _.countBy(_.filter(data, ['driveTimeExceeded', true]), result => moment(result.timestamp).startOf('day'));
    const groupedAlerts = _.groupBy(data, result => moment(result.timestamp).startOf('day'));

    Object.keys(groupedSpeedResults).forEach((key) => {
      const obj = {
        x: new Date(key),
        y: groupedSpeedResults[key],
      };
      speedData.push(obj);
    });

    Object.keys(groupedTimeResults).forEach((key) => {
      const obj = {
        x: new Date(key),
        y: groupedTimeResults[key],
      };
      timeData.push(obj);
    });

    Object.keys(groupedAlerts).forEach((key) => {
      const obj = {
        key,
        timestamp: new Date(key),
        speedLimit: _.sumBy(groupedAlerts[key], i => (i.speedLimitExceeded === true ? 1 : 0)),
        timeLimit: _.sumBy(groupedAlerts[key], i => (i.driveTimeExceeded === true ? 1 : 0)),
      };
      alerts.push(obj);
    });

    const orderedSpeedData = _.sortBy(speedData, 'x');
    const orderedTimeData = _.sortBy(timeData, 'x');
    dataStats.speed.datasets[0].data = orderedSpeedData;
    dataStats.time.datasets[0].data = orderedTimeData;

    if (this.state.isMounted) {
      this.setState({
        dataStats,
        loading: false,
        alerts,
        groupedAlerts,
      });
    }
  }

  async updateSpan(event) {
    await this.setState({ span: event.target.value, loading: true });
    this.getData();
  }
  render() {
    if (this.props.activeTab !== '3') return <div />;

    else if (this.state.loading) return <Loader />;

    const yMaxSpeed = Math.max(...this.state.dataStats.speed.datasets[0].data.map(o => o.y));
    const yMaxTime = Math.max(...this.state.dataStats.time.datasets[0].data.map(o => o.y));

    const { t } = this.props;
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
            data={this.state.dataStats.speed}
            title={t('Speeding Alerts by Day')}
            yMax={yMaxSpeed}
          />
          <LineChart
            data={this.state.dataStats.time}
            title={t('Hours of Driving Alerts by Day')}
            yMax={yMaxTime}
          />
        </div>
        <AlertsTable
          stats={this.state.alerts}
          groupedAlerts={this.state.groupedAlerts}
        />
      </div>

    );
  }
}

Alerts.propTypes = {
  token: PropTypes.string.isRequired,
  activeTab: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  token: state.auth.token,
});
const translateFunc = translate('translations')(Alerts);
export default connect(mapStateToProps)(translateFunc);
