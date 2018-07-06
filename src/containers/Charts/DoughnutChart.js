import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import '../../assets/styles/legend.css';

const options = {
  legend: {
    position: 'bottom',
    labels: {
      boxWidth: 10,
    },
  },
  maintainAspectRatio: false,
  title: {
    display: true,
    text: '',
    fontSize: 20,
    fontStyle: 'normal',
  },
};

class DoughnutChart extends React.Component {
  render() {
    options.title.text = this.props.title;

    return (
      <div>
        <Doughnut
          data={this.props.data}
          options={options}
          width={260}
          height={260}
        />
      </div>
    );
  }
}

DoughnutChart.propTypes = {
  data: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default DoughnutChart;
