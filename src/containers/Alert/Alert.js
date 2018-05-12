import React from 'react';
import PropTypes from 'prop-types';
import Aux from '../../hoc/Aux';
import '../../assets/styles/alert.css';

class Alert extends React.Component {
  state = {
    visible: true,
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        visible: false,
      });
    }, 4000);
  }

  render() {
    let tmpAlert;
    let messageFade;
    if (this.props.alertType === 'SUCCESS') {
      tmpAlert = 'alert alert-success';
      messageFade = 'alert alert-success slideup';
    } else {
      tmpAlert = 'alert alert-danger';
      messageFade = 'alert alert-danger slideup';
    }

    let alert = <div className={tmpAlert}> {this.props.message} </div>;
    if (this.state.visible === false) {
      alert = <div className={messageFade}> {this.props.message} </div>;
    }
    return (
      <Aux>
        { alert }
      </Aux>
    );
  }
}
Alert.propTypes = {
  alertType: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,

};

export default Alert;
