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
        <div className="navibar">
          <Navibar isAuth={this.props.isAuthenticated} />
        </div>
        <div className="layout-container">
          { this.props.isAuthenticated &&
          <Sidebar isAdm={this.props.isAdmin} />
          }
          <main className="main">
            { this.props.children }
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
