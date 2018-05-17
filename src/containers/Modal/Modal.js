import React from 'react';
import ReactModal from 'react-modal';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Aux from '../../hoc/Aux';
import '../../assets/styles/alert.css';


class Modal extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <Aux>
        <button onClick={this.handleOpenModal} disabled> <FontAwesomeIcon icon="info-circle" className="customIcon" /> </button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
        >
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </ReactModal>
      </Aux>
    );
  }
}

export default Modal;
