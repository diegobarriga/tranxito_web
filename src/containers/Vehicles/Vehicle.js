import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import Aux from '../../hoc/Aux';
import VehicleInfo from './VehicleInfo';
import Heatmap from './Heatmap';

class Vehicle extends React.Component {
  render() {
    const { id } = this.props.match.params;
    return (
      <Aux>
        <Container>
          <VehicleInfo id={id} />
          <Heatmap id={id} />
        </Container>
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
