import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Aux from '../../hoc/Aux';
import Navibar from '../../components/NaviBar/NaviBar';
import Sidebar from '../../components/Sidebar/Sidebar';
import '../../assets/styles/layout.css';


class Layout extends Component {
  componentDidMount() {
    console.log(this.props.showSidebar);
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
              { this.props.showSidebar &&
              <div className="leftSidebar">
                <Sidebar
                  isAdm={this.props.isAdmin}
                  profileImage={this.props.image}
                  name={this.props.name}
                  last={this.props.last}
                  mc={this.props.mcName}
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
  showSidebar: PropTypes.bool.isRequired,
  image: PropTypes.string,
  name: PropTypes.string,
  last: PropTypes.string,
  mcName: PropTypes.string,

};

Layout.defaultProps = {
  userId: null,
  token: null,
  name: null,
  last: null,
  mcName: null,
  image: null,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  showSidebar: state.auth.token !== null && state.auth.role !== 'D',
  userId: state.auth.userId,
  token: state.auth.token,
  isAdmin: state.auth.role === 'A',
  image: state.auth.image,
  name: state.auth.firstName,
  last: state.auth.lastName,
  mcName: state.auth.mcName,
});

export default connect(mapStateToProps)(Layout);
