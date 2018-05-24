import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import api from '../../services/api';
import { EVENT_CODES } from '../../utils/eventTypes';
import Loader from '../../components/Loader/Loader';

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
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
      api_logs: null,
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
        const logs = response.data;
        this.setState({ loading: false, api_logs: logs }, this.processData);
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error.message);
      });
  }

  processData = () => {
    const graphData = this.state.chartData;
    graphData.datasets[0].data = [];

    // Agregar el estado inicial
    graphData.datasets[0].data.push({
      x: 0,
      y: EVENT_CODES[1][this.state.api_logs[0].event_code],
    });
    this.state.api_logs[1].map((event) => {
      graphData.datasets[0].data.push({
        x: parseFloat(event.event_timestamp.substring(11, 13)) +
           (parseFloat(event.event_timestamp.substring(14, 16)) / 60),
        y: EVENT_CODES[1][event.event_code],
      });
    });
    this.setState({ chartData: graphData });
  }

  render() {
    if (this.state.loading === true) return <Loader />;

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
                          ticks: {
                            min: 0,
                            max: 24,
                            stepSize: 1,
                          },
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
                        }],
                        gridLines: [{
                          display: true,
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
