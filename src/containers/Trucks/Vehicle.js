import React from 'react';
import PropTypes from 'prop-types';
import Aux from '../../hoc/Aux';
import VehicleInfo from './VehicleInfo';


class Vehicle extends React.Component {
  render() {
    const { id } = this.props.match.params;
    return (
      <Aux>
        <VehicleInfo id={id} />
      </Aux>

    );
  }
}

Vehicle.propTypes = {
  id: PropTypes.number,
  match: PropTypes.object.isRequired,
};

Vehicle.defaultProps = {
  id: undefined,
};


export default Vehicle;
