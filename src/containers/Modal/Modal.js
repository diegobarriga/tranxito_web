import React from 'react';
import ReactModal from 'react-modal';
import { Button, Header, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Aux from '../../hoc/Aux';
import '../../assets/styles/alert.css';

const customStyles = {
  content: {
    top: '180px',
    left: '24rem',
    right: '24rem',
    bottom: '180px',
  },
};

const Styles = {
  button: {
    border: 'none',
    backgroundColor: 'white',
    float: 'right',
  },
  content: {
    display: 'block',
    width: '100%',
    fontSize: '1em',
    lineHeight: '1.4',
    padding: '1.5rem',
    background: 'white',
    borderTop: '1px solid rgba(34,36,38,.15)',
  },
  pFont: {
    fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
  },
  actionn: {
    borderTop: '1px solid rgba(34,36,38,.15)',
    textAlign: 'right',
  },
  button2: {
    marginTop: '8px',
  },
};

class ConfirmModal extends React.Component {
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
        <Button onClick={this.handleOpenModal} floated="right" primary size="small" >Certify Events</Button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
          style={customStyles}
        >
          <Aux>
            <div>
              <Button style={Styles.button} onClick={this.handleCloseModal}>&#10006;</Button>
            </div>
            <br />
            <div style={Styles.content}>
              <p style={Styles.pFont}> {this.props.text} </p>
            </div>
            <div style={Styles.actionn}>
              <button style={Styles.button2} className="ui green button">
                <i aria-hidden="true" className="checkmark icon" />
                 Yes
              </button>
              <button style={Styles.button2} className="ui red button">
                <i aria-hidden="true" className="remove icon" />
                  No
              </button>
            </div>

          </Aux>
        </ReactModal>
      </Aux>
    );
  }
}


ConfirmModal.propTypes = {
  // show: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default ConfirmModal;
