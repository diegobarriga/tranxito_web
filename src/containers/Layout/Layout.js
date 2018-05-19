import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Aux from '../../hoc/Aux';
import Navibar from '../../components/NaviBar/NaviBar';
import Sidebar from '../../components/Sidebar/Sidebar';
import '../../assets/styles/layout.css';

class Layout extends Component {
  render() {
    return (
      <Aux>
        <div className="app">
          <header className="appNavbar" >
            <Navibar isAuth={this.props.isAuthenticated} />
          </header>
          <main className="appBody">
            <div className="appMain">
              <div className="centerArea">
                { this.props.children }
              </div>
              { this.props.isAuthenticated &&
              <div className="leftSidebar">
                <Sidebar isAdm={this.props.isAdmin} />
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
  isAdmin: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  isAdmin: state.auth.role === 'A',
});

export default connect(mapStateToProps)(Layout);
