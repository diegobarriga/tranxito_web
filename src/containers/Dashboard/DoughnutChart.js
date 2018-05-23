import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { EVENT_COLORS, DUTY_STATUS } from '../../utils/eventTypes';


const options = {
  legend: {
    position: 'bottom',
    // labels: {
    //   boxWidth: 10
    // }
  },
};

const data = {
  labels: [
    DUTY_STATUS[1], DUTY_STATUS[2], DUTY_STATUS[3], DUTY_STATUS[4], DUTY_STATUS[5],
  ],
  datasets: [
    {
      data: [
        300, 50, 100, 40,
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
      <div>
        <Doughnut
          data={data}
          options={options}
        />
      </div>
    );
  }
}

export default DoughnutChart;
