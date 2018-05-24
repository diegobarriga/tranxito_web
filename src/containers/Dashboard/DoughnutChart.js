import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { EVENT_COLORS, DUTY_STATUS } from '../../utils/eventTypes';
import '../../assets/styles/legend.css';

const data = {
  labels: [
    DUTY_STATUS[1], DUTY_STATUS[2], DUTY_STATUS[3], DUTY_STATUS[4], DUTY_STATUS[5],
  ],
  datasets: [
    {
      data: [10, 20, 30, 40, 100],
      backgroundColor: [
        EVENT_COLORS[1], EVENT_COLORS[2], EVENT_COLORS[3], EVENT_COLORS[4], EVENT_COLORS[5],
      ],
      hoverBackgroundColor: [
        EVENT_COLORS[1],
        EVENT_COLORS[2],
        EVENT_COLORS[3],
        EVENT_COLORS[4],
        EVENT_COLORS[5]],
    },
  ],
};

const options = {
  legend: {
    position: 'bottom',
    labels: {
      boxWidth: 10,
    },
  },
  maintainAspectRatio: false,
};

class DoughnutChart extends React.Component {
  render() {
    if (this.props.activeTab !== '2') return <div />;
    return (
      <div className="doughnutChart">
        <Doughnut
          data={data}
          options={options}
          width={300}
          height={300}
        />
      </div>
    );
  }
}

DoughnutChart.propTypes = {
  activeTab: PropTypes.string.isRequired,
};

export default DoughnutChart;
