import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import api from '../../services/api';
import { EVENT_CODES } from '../../utils/eventTypes';
// import Loader from '../../components/Loader/Loader';

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actual: 1,
      chartData: {
        xLabels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
          13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        yLabels: ['Off-duty', 'Sleeper Berth', 'Driving', 'On-duty not driving'],
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
      logs: [
        {
          event_type: 1,
          event_code: 4,
          event_timestamp: '2018-04-21T02:10:20.660Z',
        },
        [{
          event_type: 1,
          event_code: 1,
          event_timestamp: '2018-04-21T03:04:20.660Z',
        },
        {
          event_type: 1,
          event_code: 3,
          event_timestamp: '2018-04-21T07:37:20.660Z',
        },
        {
          event_type: 1,
          event_code: 2,
          event_timestamp: '2018-04-21T11:18:20.660Z',
        },
        {
          event_type: 1,
          event_code: 4,
          event_timestamp: '2018-04-21T13:42:20.660Z',
        },
        {
          event_type: 1,
          event_code: 2,
          event_timestamp: '2018-04-21T23:21:20.660Z',
        },
        ],
      ],
      api_logs: null,

    };
  }

  componentDidMount() {
    this.state.api_logs = api.people.getUserDutyStatusChange(this.props.id, this.props.token);
  }

  render() {
    // if (this.state.api_logs === null) return <Loader />;

    this.state.chartData.datasets[0].data = [];
    this.state.actual = this.state.logs[0];

    this.state.chartData.xLabels.map((hour) => {
      this.state.logs[1].map((event) => {
        if (hour === parseFloat(event.event_timestamp.substring(11, 13))) {
          if (this.state.actual.event_code !== event.event_code) {
            this.state.actual = event;
          }
        }
      });
      this.state.chartData.datasets[0].data.push({
        x: parseFloat(this.state.actual.event_timestamp.substring(11, 13)) +
         (parseFloat(this.state.actual.event_timestamp.substring(14, 16)) / 60),
        y: EVENT_CODES[1][this.state.actual.event_code],
      });
    });

    return (
      <Scatter
        data={this.state.chartData}
        height={75}
        options={{

              title: {
                display: true,
                text: 'Last 24 hours',
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
                            labelString: 'Time',
                          },
                        }],
                        yAxes: [{
                          type: 'category',
                          position: 'left',
                          display: true,
                          scaleLabel: {
                            display: true,
                            labelString: 'Duty status',
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
  token: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(Graph);
