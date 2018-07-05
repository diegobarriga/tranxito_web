import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import '../../../assets/styles/tabs.css';
import api from '../../../services/api';
// import LogsTable from './LogsTable';
// import * as actions from '../../../store/actions/index';


class VehiclesTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // notAuthLogs: null,
    };
  }

  componentWillMount() {
    api.people.getUser(this.props.id, this.props.token)
      .then((userResponse) => {
        api.motorCarriers.getNonAuthEvents(userResponse.data.motorCarrierId, this.props.token)
          .then((response) => {
            console.log(response.data);
            const filteredLogs = response.data.filter(log => (
              log.id === this.props.id
            ));
            console.log(filteredLogs);
          });
      });
  }


  render() {
    return (
      <Container>
        <h1>Vehicles</h1>
      </Container>
    );
  }
}

VehiclesTab.propTypes = {
  id: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
};

/*
VehiclesTab.defaultProps = {
  id: undefined,
};
*/

const mapStateToProps = state => ({
  id: state.auth.userId,
  token: state.auth.token,
});

export default withRouter(connect(mapStateToProps)(VehiclesTab));
