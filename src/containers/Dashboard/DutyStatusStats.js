import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { EVENT_COLORS, DUTY_STATUS_LONG } from '../../utils/eventTypes';
import '../../assets/styles/legend.css';
import api from '../../services/api';
import DoughnutChart from '../Charts/DoughnutChart';
import SimpleTable from './SimpleTable';
import * as functions from '../../utils/tableFunctions';
import Loader from '../../components/Loader/Loader';
import '../../assets/styles/forms.css';

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

class DutyStatusStats extends React.Component {
  constructor(props) {
    super(props);
    const { t } = this.props;
    this.state = {
      isMounted: false,
      span: 'week',
      vehiclesDutyStats: null,
      driversDutyStats: null,
      loadingStats: false,
      loadingDutyStats: false,
      type: 'Driver',
    };
    console.log('HOLAAAA');
    dataDutyStats.labels = [
      t(DUTY_STATUS_LONG[1]), t(DUTY_STATUS_LONG[2]), t(DUTY_STATUS_LONG[3]), t(DUTY_STATUS_LONG[4]),
    ];
    console.log(t(DUTY_STATUS_LONG[1]));
    console.log(t(DUTY_STATUS_LONG[2]));
    console.log(DUTY_STATUS_LONG[3]);
    console.log(DUTY_STATUS_LONG[4]);
    console.log('CHAOOOOOoooo');

    this.setDutyStats = this.setDutyStats.bind(this);
    this.setDriversDutyStats = this.setDriversDutyStats.bind(this);
    this.setVehiclesDutyStats = this.setVehiclesDutyStats.bind(this);
    this.updateSpan = this.updateSpan.bind(this);
    this.updateType = this.updateType.bind(this);
  }

  componentDidMount() {
    this.setState({
      isMounted: true,
    });
    // console.log("didmount");
    this.getData();
  }

  componentWillUnmount() {
    this.setState({
      isMounted: false,
    });
  }

  getData() {
    this.setState({ loadingDutyStats: true });
    this.getDataByFunction(api.motorCarriers.getDutyStats, this.setDutyStats);
    this.getTableData();
  }

  getTableData() {
    if (this.state.type === 'Driver') {
      // console.log("entro al getTableData de drivers");
      this.setState({ loadingStats: true });
      this.getDataByFunction(api.motorCarriers.getDriversDutyStats, this.setDriversDutyStats);
    } else {
      // console.log("entro al getTableData de vehiculos");
      this.setState({ loadingStats: true });
      this.getDataByFunction(api.motorCarriers.getVehiclesDutyStats, this.setVehiclesDutyStats);
    }
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
          this.setState({ loadingStats: false });
        }
      });
  }

  setVehiclesDutyStats(data) {
    // console.log("entro al trigger de drvier");
    // console.log("datavehiculo", data);
    if (this.state.isMounted) {
      // console.log("vehicle is mounted");
      this.setState({ vehiclesDutyStats: data.data, loadingStats: false });
    }
  }

  setDriversDutyStats(data) {
    // console.log("entro al trigger de drvier");
    if (this.state.isMounted) {
      console.log('entro al setstate drviers');
      this.setState({ driversDutyStats: data.data, loadingStats: false });
    }
  }

  setDutyStats(data) {
    // console.log("entro al trigger de duty");
    dataDutyStats.datasets[0].data = [
      functions.round(data.data[1]),
      functions.round(data.data[2]),
      functions.round(data.data[3]),
      functions.round(data.data[4]),
    ];
    console.log(dataDutyStats.datasets[0].data);
    if (this.state.isMounted) {
      console.log('entro al setstate stats');
      this.setState({ loadingDutyStats: false });
    }
  }

  async updateSpan(event) {
    // console.log('old span: ', this.state.span);
    // console.log('recieved span: ', event.target.value);
    // this.state.span = event.target.value;
    await this.setState({
      span: event.target.value,
      loadingStats: true,
      loadingDutyStats: true,
    });
    // console.log('new span: ', this.state.span);
    this.getData();
  }

  async updateType(event) {
    // console.log('old type: ', this.state.type);
    // console.log('recieved type: ', event.target.value);
    // this.state.span = event.target.value;
    await this.setState({
      type: event.target.value,
      loadingStats: true,
      // loadingDutyStats: true,
    });
    // console.log('new type: ', this.state.type);
    this.getTableData();
  }

  render() {
    // console.log(dataDutyStats);
    if (this.props.activeTab !== '2') return <div />;

    else if (
      this.state.loadingStats ||
      this.state.loadingDutyStats
    ) return <Loader />;

    // console.log(dataDutyStats);
    // console.log('driversDutyStats', this.state.driversDutyStats);

    let data = [];

    if (this.state.type === 'Driver') {
      data = this.state.driversDutyStats;
    } else {
      data = this.state.vehiclesDutyStats;
    }
    // console.log('data1', data);
    const { t } = this.props;
    return (
      <div className="margin">
        <div className="inlineBoxRight">
          <div className="content">
            <span>{t('Type')} </span>
            <select name="time" onChange={this.updateType} value={this.state.type}>
              <option value="Driver">{t('Driver')}</option>
              <option value="Vehicle">{t('Vehicle')}</option>
            </select>
            <span>{t('Time interval')} </span>
            <select name="time" onChange={this.updateSpan} value={this.state.span}>
              <option value="day">{t('Day')}</option>
              <option value="week">{t('Week')}</option>
              <option value="month">{t('Month')}</option>
            </select>
          </div>
        </div>
        <DoughnutChart
          data={dataDutyStats}
          title={t('Accumulated Duty Status Hours Per Type')}
        />
        <div className="padding margin">
          <SimpleTable
            type={this.state.type}
            stats={data}
          />
        </div>
      </div>

    );
  }
}

DutyStatusStats.propTypes = {
  token: PropTypes.string.isRequired,
  motorCarrierId: PropTypes.number.isRequired,
  activeTab: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  token: state.auth.token,
  motorCarrierId: state.auth.motorCarrierId,
});
const translateFunc = translate('translations')(DutyStatusStats);
export default connect(mapStateToProps)(translateFunc);
