import React from 'react';


const styles = {
  avatar: {
    borderRadius: '50%',
    height: '150px',
    width: '150px',
  },
};

export default class Avatar extends React.Component {
  render() {
    return (
      <img src={this.props.src} style={styles.avatar} />
    );
  }
}
