import React from 'react';
import PropTypes from 'prop-types';
import Aux from '../../hoc/Aux';
import Graph from './graph';
import UserLogs from './UserLogs';
import UserInfo from './UserInfo';


class User extends React.Component {
  render() {
    const { id } = this.props.match.params;
    return (
      <Aux>
        <UserInfo id={id} />
        <Graph id={id} />
        <UserLogs id={id} />
      </Aux>

    );
  }
}

User.propTypes = {
  id: PropTypes.number,
  match: PropTypes.object.isRequired,
};

User.defaultProps = {
  id: undefined,
};


export default User;
