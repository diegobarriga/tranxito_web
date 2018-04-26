import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem, Button, Row, Col, Container, Table } from 'reactstrap';
import Aux from '../../hoc/Aux';
import axios from 'axios';
import Avatar from '../../components/Avatar';
import Loader from '../../components/Loader/Loader';
import { EVENT_TYPES, EVENT_CODES } from '../../utils/eventTypes';
import {Bar, Line, Pie} from 'react-chartjs-2';

const styles = {
  userProfile: {
    flexDirection: "row",
    alignItems: "center",
    margin: "24px 12px"
  },
  userData: {
    flexDirection: "column",
    marginLeft: "12px"
  },
  userLogsContainer: {
    maxHeight: `${50*6}px`,
    overflow: "scroll",
  },
}

class Graph extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: undefined,
      loading: true,
      chartData:{
        xLabels: ['1', '2', '3', '4', '5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'],
        yLabels: ['A','B','C','D'],
        datasets:[
          {
            steppedLine:true,
            label:'Population',
            data: [
              'A','B','C','B','A','C','D','D','C','C','C','A',
              'B','C','D','D','C','C','C','A','C','D','D'


            ],
            backgroundColor:[
              'rgba(255, 255, 255, 0.6)'
            ]
          }
        ]
      }
    }
  }

    render(){
      return (
            <Line
            data={this.state.chartData}
            height={75}
            options={{

              title:{
                display:true,
                text:'Estado Conductor: 21 de Abril',
                fontSize:25,

              },
              legend:{
                display:false,
              },
              scales: {
                        xAxes: [{
                          display: true,
                          scaleLabel: {
                            display: true,
                            labelString: 'Hora del día'
                          }
                        }],
                        yAxes: [{
                          type: 'category',
                          position: 'left',
                          display: true,
                          scaleLabel: {
                            display: true,
                            labelString: 'Estado Conductor'
                          },
                          ticks: {
                            reverse: true
                          }
                        }]
                      }
            }}
            />



        );
    }
}

export default Graph;
