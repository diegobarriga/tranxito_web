import React from 'react';
import SimpleReactFileUpload from '../templates/create_entity';

class CreateDevices extends React.Component {
  render() {
    return (
      <SimpleReactFileUpload type="devices" />
    );
  }
}

export default CreateDevices;
