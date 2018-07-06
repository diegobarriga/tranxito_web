import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import '../../assets/styles/legend.css';

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        legend: {
          display: false,
        },
        maintainAspectRatio: false,
        title: {
          display: true,
          text: '',
          fontSize: 16,
          fontStyle: 'normal',
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              max: props.yMax + 0.2,
              autoSkip: false,
              callback(value) {
                if (value % 1 === 0) {
                  return value;
                }
                return '';
              },
            },
            gridLines: {
              display: true,
            },
            bounds: 'data',
          }],
          xAxes: [{
            beginAtZero: true,
            type: 'time',
            distribution: 'linear',
            maxTicksLimit: 0,
            time: {
              unit: 'week',
            },
            bounds: 'ticks',
            ticks: {
              autoSkip: false,
            },
          }],
        },
      },
    };
  }

  render() {
    this.state.options.title.text = this.props.title;

    return (
      <div>
        <Line
          data={this.props.data}
          options={this.state.options}
          width={400}
          height={250}
        />
      </div>
    );
  }
}

LineChart.propTypes = {
  data: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  yMax: PropTypes.number.isRequired,
};

export default LineChart;
