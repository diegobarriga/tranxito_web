import { Component } from 'react';
import { createPortal } from 'react-dom';
import { MAP } from 'react-google-maps/lib/constants';
import PropTypes from 'prop-types';

class MapControl extends Component {
  static contextTypes = { [MAP]: PropTypes.object }
  componentWillMount() {
    this.map = this.context[MAP];
    this.controlDiv = document.createElement('div');
    this.divIndex = this.map.controls[this.props.position].push(this.controlDiv) - 1;
  }
  componentWillUnmount() {
    this.map.controls[this.props.position].removeAt(this.divIndex);
  }
  render() {
    return createPortal(this.props.children, this.controlDiv);
  }
}

MapControl.propTypes = {
  position: PropTypes.number.isRequired,
  children: PropTypes.object.isRequired,
};

export default MapControl;
