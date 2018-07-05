import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../assets/styles/chat.css';

class Chat extends React.Component {
  render() {
    if (this.props.activeTab !== '4') return <div />;

    const { lastName, driverLicenseNumber } = this.props.users[this.props.id];
    const { firstName } = this.props.users[this.props.userId];
    const url = lastName ? (`https://embed.tlk.io/${lastName}-${driverLicenseNumber}`) : '';
    const uri = `${url}?theme=theme--night&nickname=${firstName}`;

    return (
      <div>
        <iframe
          src={uri}
          title="Chat"
        />
      </div>

    );
  }
}

Chat.propTypes = {
  activeTab: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  users: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  users: state.auth.users,
  userId: state.auth.userId,
});

export default connect(mapStateToProps)(Chat);
