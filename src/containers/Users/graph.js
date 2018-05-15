import React from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../../components/Loader/Loader';
import * as actions from '../../store/actions/userLogs';
import { EVENT_CODES } from '../../utils/eventTypes';


class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        xLabels: [],
        yLabels: ['Off-duty', 'Sleeper Berth', 'Driving', 'On-duty not driving'],
        datasets: [
          {
            steppedLine: true,
            label: 'Population',
            data: [],
            backgroundColor: [
              'rgba(255, 255, 255, 0.6)',
            ],
            borderColor: '#c7d41e',
          },
        ],
      },
      logs: [
        {
          event_type: 1,
          event_code: 1,
          event_timestamp: '2018-04-21T03:30:20.660Z',
        },
        {
          event_type: 1,
          event_code: 4,
          event_timestamp: '2018-04-21T07:30:20.660Z',
        },
        {
          event_type: 1,
          event_code: 3,
          event_timestamp: '2018-04-21T11:30:20.660Z',
        },
        {
          event_type: 1,
          event_code: 4,
          event_timestamp: '2018-04-21T13:30:20.660Z',
        },
        {
          event_type: 1,
          event_code: 2,
          event_timestamp: '2018-04-21T23:30:20.660Z',
        },
      ],

    };
  }

  componentDidMount() {
    this.props.getUserLogs(this.props.token, this.props.id);
  }

  render() {
    if (this.props.isLoading === true) return <Loader />;

    this.state.logs.map(event => (
      this.state.chartData.datasets[0].data.push({
        x: event.event_timestamp,
        y: EVENT_CODES[1][event.event_code],
      })
    ));

    this.state.logs.map(event => (
      this.state.chartData.xLabels.push(event.event_timestamp)
    ));
    // const filteredLogs = this.state.logs.filter(log => (log.event_type === '1'));
    // && datetime entre las ultimas 24 horas.

    return (
      <Line
        data={this.state.chartData}
        height={75}
        options={{

              title: {
                display: true,
                text: 'Estado Conductor: 21 de Abril',
                fontSize: 25,

              },
              legend: {
                display: false,
              },
              scales: {
                        xAxes: [{
                          display: true,
                          scaleLabel: {
                            display: true,
                            labelString: 'Hora del día',
                          },
                        }],
                        yAxes: [{
                          type: 'category',
                          position: 'left',
                          display: true,
                          scaleLabel: {
                            display: true,
                            labelString: 'Estado Conductor',
                          },
                          ticks: {
                            reverse: true,
                          },
                        }],
                      },
            }}
      />


    );
  }
}

Graph.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  getUserLogs: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  token: state.auth.token,
  loading: state.userLogs.loading,
  logs: state.userLogs.logs,
});

const mapDispatchToProps = dispatch => ({
  getUserLogs: (token, UserId) => dispatch(actions.getUserLogs(token, UserId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
