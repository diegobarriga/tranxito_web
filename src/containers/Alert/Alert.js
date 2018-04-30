import React from 'react';
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
    }, 3000);
  }

  render() {
    let message;
    let alertt;
    let messageFade;
    if (this.props.alertType === 'SUCCESS') {
      alertt = 'alert alert-success';
      messageFade = 'alert alert-success updown target';
      message = 'Supervisor created successfully';
    } else {
      alertt = 'alert alert-danger';
      message = 'Error Supervisor was not created';
      messageFade = 'alert alert-danger updown target';
    }

    let alert = <div className={alertt}> {message} </div>;
    if (this.state.visible === false) {
      alert = <div className={messageFade}> {message} </div>;
    }
    return (
      <Aux>
        { alert }
      </Aux>
    );
  }
}

export default Alert;
