import React from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { Button, Header } from 'semantic-ui-react';
import { translate } from 'react-i18next';
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
    } else {
      this.setState({ showModal: true });
    }
  }

  handleCloseModal() {
    this.setState({ toggleAlert: false });
    this.setState({ showModal: false });
  }

  handleSubmit() {
    if (this.props.isCerti) {
      api.people.userCertifyEvents(
        this.props.id,
        this.props.token,
      ).then((response) => {
        if (response.status === 200) {
          this.handleCloseModal();
          this.props.delLogs(this.props.logs);
        }
      });
    } else {
      const data = {
        data: {
          driverId: this.props.id,
          recordStatus: 1,
          annotation: 'Auto assignation',
        },
      };


      this.props.logs.forEach((log) => {
        api.events.patchEvent(
          log,
          this.props.token,
          data,
        ).then((response) => {
          if (response.status === 200) {
            this.handleCloseModal();
            this.props.delLogs(this.props.logs);
          }
        });
      });
    }
  }

  render() {
    const { t } = this.props;
    return (
      <Aux>
        {this.state.toggleAlert && <Alert message="No logs selected" alertType="d" />}
        {this.props.isCerti ?
          <Button onClick={this.handleOpenModal} style={{ paddingRight: 'none !important' }} floated="right" primary size="small" >{t('Certify Events')}</Button>
        :
          <Button onClick={this.handleOpenModal} style={{ paddingRight: 'none !important' }} floated="right" primary size="small" >{t('Assign Events')}</Button>
        }
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
          style={customStyles}
        >
          <Aux>
            <div>
              <Button style={Styles.button} onClick={this.handleCloseModal}>&#10006;</Button>
              <br />
              <Header icon="archive" content={t(this.props.content)} />
            </div>
            <br />
            <div style={Styles.content}>
              <p style={Styles.pFont}> {t(this.props.text)} </p>
            </div>
            <br />
            <div style={Styles.actionn}>
              <button style={Styles.button1} onClick={this.handleSubmit} className="ui green button">
                <i aria-hidden="true" className="checkmark icon" />
                {t('Yes')}
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
  text: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  logs: PropTypes.array,
  isCerti: PropTypes.bool.isRequired,
  delLogs: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
};

ConfirmModal.defaultProps = {
  logs: undefined,
};

const mapStateToProps = state => ({
  token: state.auth.token,
  id: state.auth.userId,
});

const translateFunc = translate('translations')(ConfirmModal);
export default connect(mapStateToProps)(translateFunc);
