import React from 'react';
import { Line } from 'react-chartjs-2';

/*
const styles = {
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: '24px 12px',
  },
  userData: {
    flexDirection: 'column',
    marginLeft: '12px',
  },
  userLogsContainer: {
    maxHeight: `${50 * 6}px`,
    overflow: 'scroll',
  },
};
*/

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // user: undefined,
      // loading: true,
      chartData: {
        xLabels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
        yLabels: ['OFF', 'SB', 'D', 'ON'],
        datasets: [
          {
            steppedLine: true,
            label: 'Population',
            data: [
              'OFF', 'OFF', 'OFF', 'OFF', 'OFF', 'D', 'D', 'D', 'SB', 'SB', 'SB', 'SB',
              'SB', 'ON', 'D', 'D', 'D', 'D', 'ON', 'OFF', 'OFF', 'OFF', 'OFF',


            ],
            backgroundColor: [
              'rgba(255, 255, 255, 0.6)',
            ],
          },
        ],
      },
    };
  }

  render() {
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

export default Graph;
