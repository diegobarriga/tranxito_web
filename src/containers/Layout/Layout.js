import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Aux from '../../hoc/Aux';
import Navibar from '../../components/NaviBar/NaviBar';
import Sidebar from '../../components/Sidebar/Sidebar';
import '../../assets/styles/layout.css';
import api from '../../services/api';

class Layout extends Component {
  state = {
    mcName: '',
  }

  componentDidMount() {
    api.motorCarriers.getMotorCarrier(
      this.props.motorCarrierId,
      this.props.token,
    ).then((response) => {
      this.setState({ mcName: response.data.name });
    });
  }
  render() {
    return (
      <Aux>
        <div className="app">
          <header className="appNavbar" >
            <Navibar
              isAuth={this.props.isAuthenticated}
              userId={this.props.userId}
              token={this.props.token}
            />
          </header>
          <main className="appBody">
            <div className="appMain">
              <div className="centerArea">
                { this.props.children }
              </div>
              { this.props.isAuthenticated &&
              <div className="leftSidebar">
                <Sidebar
                  isAdm={this.props.isAdmin}
                  profileImage={this.props.image}
                  name={this.props.name}
                  last={this.props.last}
                  mc={this.state.mcName}
                />
              </div>
              }
            </div>
            <footer />
          </main>
        </div>
      </Aux>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  userId: PropTypes.number,
  token: PropTypes.string,
  isAdmin: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  last: PropTypes.string.isRequired,
  motorCarrierId: PropTypes.string.isRequired,
};

Layout.defaultProps = {
  userId: null,
  token: null,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  userId: state.auth.userId,
  token: state.auth.token,
  isAdmin: state.auth.role === 'A',
  image: state.auth.image,
  name: state.auth.first_name,
  last: state.auth.last_name,
  motorCarrierId: state.auth.motorCarrierId,
});

export default connect(mapStateToProps)(Layout);
