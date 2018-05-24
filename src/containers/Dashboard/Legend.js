import React from 'react';
import '../../assets/styles/legend.css';
import { DUTY_STATUS } from '../../utils/eventTypes';

const marker1 = require('../../assets/images/truck_marker_1.svg');
const marker2 = require('../../assets/images/truck_marker_2.svg');
const marker3 = require('../../assets/images/truck_marker_3.svg');
const marker4 = require('../../assets/images/truck_marker_4.svg');
const marker5 = require('../../assets/images/truck_marker.svg');

class Legend extends React.Component {
  render() {
    return (
      <div className="legend">
        <div className="legend-row"><img src={marker1} alt="OD" height="15" width="15" /> {DUTY_STATUS[1]}</div>
        <div className="legend-row"><img src={marker2} alt="ODD" height="15" width="15" /> {DUTY_STATUS[2]}</div>
        <div className="legend-row"><img src={marker3} alt="SB" height="15" width="15" /> {DUTY_STATUS[3]}</div>
        <div className="legend-row"><img src={marker4} alt="OC" height="15" width="15" /> {DUTY_STATUS[4]}</div>
        <div className="legend-row"><img src={marker5} alt="OC2" height="15" width="15" /> UNDEF</div>
      </div>
    );
  }
}

export default Legend;
