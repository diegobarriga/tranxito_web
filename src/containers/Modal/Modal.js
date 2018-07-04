import React from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { Button, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import api from '../../services/api';
import Aux from '../../hoc/Aux';
import '../../assets/styles/alert.css';
import Alert from '../Alert/Alert';

const customStyles = {
  content: {
    top: '30%',
    left: '20%',
    right: '20%',
    bottom: '25%',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,.85)',
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
  button1: {
    marginTop: '20px',
    marginRight: '10px',
  },
  button2: {
    marginTop: '20px',
  },
};

class ConfirmModal extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      toggleAlert: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpenModal() {
    if (this.props.logs.length === 0) {
      console.log('logs cant be blank');
    } else {
      this.setState({ showModal: true });
    }
  }

  handleCloseModal() {
    this.setState({ toggleAlert: false });
    this.setState({ showModal: false });
  }

  handleSubmit() {
    console.log(this.props.logs);
    api.people.userCertifyEvents(
      this.props.id,
      this.props.token,
      this.props.logs,
    ).then((response) => {
      if (response.status === 200) {
        this.handleCloseModal();
      }
    });
  }

  render() {
    return (
      <Aux>
        {this.state.toggleAlert && <Alert message="No logs selected" alertType="d" />}
        <Button onClick={this.handleOpenModal} style={{ paddingRight: 'none !important' }} floated="right" primary size="small" >Certify Events</Button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
          style={customStyles}
        >
          <Aux>
            <div>
              <Button style={Styles.button} onClick={this.handleCloseModal}>&#10006;</Button>
              <br />
              <Header icon="archive" content="Certify My Logs" />
            </div>
            <br />
            <div style={Styles.content}>
              <p style={Styles.pFont}> {this.props.text} </p>
            </div>
            <br />
            <div style={Styles.actionn}>
              <button style={Styles.button1} onClick={this.handleSubmit} className="ui green button">
                <i aria-hidden="true" className="checkmark icon" />
                 Yes
              </button>
              <button style={Styles.button2} onClick={this.handleCloseModal} className="ui red button">
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
  token: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  logs: PropTypes.array,
};

ConfirmModal.defaultProps = {
  logs: undefined,
};

const mapStateToProps = state => ({
  token: state.auth.token,
  id: state.auth.userId,
});

export default connect(mapStateToProps)(ConfirmModal);
