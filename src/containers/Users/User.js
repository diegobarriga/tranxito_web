import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import Graph from './graph';
import UserLogs from './UserLogs';
import UserInfo from './UserInfo';


class User extends React.Component {
  render() {
    const { id } = this.props.match.params;
    return (
      <Container>
        <UserInfo id={id} />
        <Graph id={id} />
        <UserLogs id={id} />
      </Container>
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
