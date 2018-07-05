import React from 'react';
import SimpleReactFileUpload from '../templates/create_entity';

class CreateTrailers extends React.Component {
  render() {
    return (
      <SimpleReactFileUpload type="trailers" />
    );
  }
}

export default CreateTrailers;
