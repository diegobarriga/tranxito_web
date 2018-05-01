import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Container } from 'reactstrap';
import Aux from '../../hoc/Aux';
import Avatar from '../../components/Avatar';
import Graph from './graph';
import Loader from '../../components/Loader/Loader';

const styles = {
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: '24px 12px',
  },
  userData: {
    flexDirection: 'column',
    marginLeft: '12px',
  },
};

class UserInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
      loading: true,
    };
  }

  async componentWillMount() {
    try {
      const response = await axios.get(`https://private-8f8d7c-elde2e.apiary-mock.com/drivers_and_events/${this.props.id}`);
      console.log(response);
      const user = response.data;
      this.setState({ user, loading: false });
    } catch (error) {
      console.error(error);
    }
  }


  render() {
    if (this.state.loading) return <Aux><Loader /></Aux>;
    const { user } = this.state;


    return (
      <Aux>

        <h1>{`${user.first_name} ${user.last_name}`}</h1>
        <Row style={styles.userProfile}>
          <Avatar src={user.picture} />
          <div style={styles.userData}>
                <div>Driver license number: {user.driver_license_number}</div>
                <div>Email: {user.email}</div>
              </div>
        </Row>

      </Aux>

    );
  }
}

export default UserInfo;
