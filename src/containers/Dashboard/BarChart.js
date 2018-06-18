import React from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
// import { EVENT_COLORS, DUTY_STATUS } from '../../utils/eventTypes';
import '../../assets/styles/legend.css';

class BarChart extends React.Component {
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
            },
          }],
          // xAxes: [{
          //   gridLines: {
          //     offsetGridLines: true,
          //   },
          // }],
        },
      },
    };
  }

  render() {
    // if (this.props.activeTab !== '2') return <div />;
    this.state.options.title.text = this.props.title;

    return (
      <div>
        <Bar
          data={this.props.data}
          options={this.state.options}
          width={400}
          height={250}
        />
      </div>
    );
  }
}

BarChart.propTypes = {
  data: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default BarChart;
