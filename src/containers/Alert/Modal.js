import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import * as actions from '../../store/actions/index';
import '../../assets/styles/alert.css';

const styles = {
  modal: {
    height: '189px',
    width: '900px',
  },
};

class ConfirmModal extends React.Component {
  render() {
    return (
      <Modal trigger={<Button floated="right" primary size="small" >Certify Events</Button>} closeIcon>
        <Header icon="archive" content="Archive Old Messages" />
        <Modal.Content style={styles.modal}>
          <p>
            { this.props.text }
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red">
            <Icon name="remove" /> No
          </Button>
          <Button color="green">
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}


ConfirmModal.propTypes = {
  // show: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => ({
  errorDelete: () => dispatch(actions.errorReset()),
});

export default connect(null, mapDispatchToProps)(ConfirmModal);
