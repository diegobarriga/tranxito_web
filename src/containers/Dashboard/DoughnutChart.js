import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { EVENT_COLORS, DUTY_STATUS } from '../../utils/eventTypes';
import '../../assets/styles/legend.css';

const options = {
  legend: {
    position: 'bottom',
    labels: {
      boxWidth: 10
    }
  },
  maintainAspectRatio: false,
};

const data = {
  labels: [
    DUTY_STATUS[1], DUTY_STATUS[2], DUTY_STATUS[3], DUTY_STATUS[4], DUTY_STATUS[5],
  ],
  datasets: [
    {
      data: [
        300, 50, 100, 40, 10,
      ],
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

class DoughnutChart extends React.Component {
  render() {
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

export default DoughnutChart;
