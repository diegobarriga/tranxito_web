import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class ModalTemplate extends Component {
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> Fix App.js
=======
>>>>>>> more cleanup
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
<<<<<<< HEAD
    const { errors } = this.state;
    const {
 show, close, title, FormComponent, submitFunc 
} = this.props;
=======
    const { show, close, title, FormComponent, submitFunc } = this.props;
>>>>>>> more cleanup
    return (
      <Modal open={show} dimmer="inverted" onClose={close}>
        <Modal.Header toggle={close}>
          <h2><b>{title}</b></h2>
        </Modal.Header>
        <Modal.Content>
          <FormComponent submitFunc={submitFunc} closeModal={close} />
        </Modal.Content>
      </Modal>
    );
  }
}

ModalTemplate.propTypes = {
  submitFunc: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default ModalTemplate;
