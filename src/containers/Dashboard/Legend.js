import React from 'react';
import '../../assets/styles/legend.css';

const marker1 = require('../../assets/images/truck_marker_1.svg');
const marker2 = require('../../assets/images/truck_marker_2.svg');
const marker3 = require('../../assets/images/truck_marker_3.svg');
const marker4 = require('../../assets/images/truck_marker_4.svg');
const marker5 = require('../../assets/images/truck_marker.svg');

class Legend extends React.Component {
  render() {
    return (
      <div className="legend">
        <div className="legend-row"><img src={marker1} alt="OD" height="15" width="15" /> OFF DUTY</div>
        <div className="legend-row"><img src={marker2} alt="ODD" height="15" width="15" /> SLEEPER BERTH</div>
        <div className="legend-row"><img src={marker3} alt="SB" height="15" width="15" /> DRIVING</div>
        <div className="legend-row"><img src={marker4} alt="OC" height="15" width="15" /> ON DUTTY</div>
        <div className="legend-row"><img src={marker5} alt="OC2" height="15" width="15" /> UNDEFINED</div>
      </div>
    )
  }
}

// MapControl.propTypes = {
//   position: PropTypes.number.isRequired,
//   children: PropTypes.object.isRequired,
// };

export default Legend;
