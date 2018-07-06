import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { translate } from 'react-i18next';
import api from '../../services/api';
import { EVENT_CODES } from '../../utils/eventTypes';
import Loader from '../../components/Loader/Loader';

const moment = require('moment');

class Graph extends React.Component {
  constructor(props) {
    super(props);
    const { t } = this.props;
    this.state = {
      loading: false,
      chartData: {
        xLabels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
          13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        yLabels: [t('Off-duty'), t('Sleeper Berth'), t('Driving'), t('On-duty not driving')],
        datasets: [
          {
            steppedLine: true,
            label: 'Population',
            data: [],
            backgroundColor: ['rgba(255, 255, 255, 0.6)'],
            borderColor: '#c7d41e',
            showLine: true,
          },
        ],
      },
      api_logs: null,
      firstLog: null,
    };
    this.getData = this.getData.bind(this);
    this.processData = this.processData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    this.setState({ loading: true });
    api.people.getUserDutyStatusChange(this.props.id, this.props.token)
      .then((response) => {

        const logs = Object.values(response.data.data[1]);

        logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        const firstLog = response.data.data[0];


        this.setState({ loading: false, api_logs: logs, firstLog }, this.processData);
      })
      .catch((error) => {
        this.setState({ loading: false });

      });
  }

  processData = () => {
    const graphData = this.state.chartData;
    const logs = this.state.api_logs.reverse();
    const { t } = this.props;
    graphData.datasets[0].data = [];

    graphData.datasets[0].data.push({
      x: 0,
      y: t(EVENT_CODES[1][this.state.firstLog.code]),
    });

    logs.forEach((event) => {
      const hour = parseInt(moment(event.timestamp).format('H'), 10);
      const minutes = parseInt(moment(event.timestamp).format('m'), 10);

      graphData.datasets[0].data.push({
        x: (hour + (minutes / 60)),
        y: t(EVENT_CODES[1][event.code]),
      });
    });

    // AGREGAR UN DATO DEL ULTIMO DUTY STATUS CON LA HORA ACTUAL
    if (logs.length > 0) {
      const now = moment();
      const nownumber = now.hour() + (now.minute() / 60);
      graphData.datasets[0].data.push({
        x: nownumber,
        y: t(EVENT_CODES[1][logs[logs.length - 1].code]),
      });
    } else {
      if (this.state.firstLog !== undefined) {
        const now = moment();
        const nownumber = now.hour() + (now.minute() / 60);


        graphData.datasets[0].data.push({
          x: nownumber,
          y: t(EVENT_CODES[1][this.state.firstLog.code]),
        });
      }
    }
    this.setState({ chartData: graphData });
  }

  render() {
    if (this.state.loading === true) return <Loader />;
    const { t } = this.props;
    return (
      <Row>
        <Col sm="12" md={{ size: 12 }}>
          <Scatter
            data={this.state.chartData}
            height={75}
            options={{
                  title: {
                    display: true,
                    text: t('Last 24 hours'),
                    fontSize: 25,
                  },
                  legend: {
                    display: false,
                  },
                  scales: {
                            xAxes: [{
                              display: true,
                              ticks: {
                                min: 0,
                                max: 24,
                                stepSize: 1,
                              },
                              scaleLabel: {
                                display: true,
                                labelString: t('Time'),
                              },
                            }],
                            yAxes: [{
                              type: 'category',
                              position: 'left',
                              display: true,
                              scaleLabel: {
                                display: true,
                                labelString: t('Duty status'),
                              },
                            }],
                            gridLines: [{
                              display: true,
                            }],
                          },
                }}
          />
        </Col>
      </Row>
    );
  }
}

Graph.propTypes = {
  token: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  token: state.auth.token,
});

const translateFunc = translate('translations')(Graph);
export default connect(mapStateToProps)(translateFunc);
