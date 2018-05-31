import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  avatar: {
    height: '100px',
    width: '100px',
  },
};

class Avatar extends React.Component {
  render() {
    return (
      <img alt="user_avatar" src={this.props.src} style={styles.avatar} />
    );
  }
}

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Avatar;
