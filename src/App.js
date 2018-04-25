import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import './assets/styles/App.css';
import { Route, Switch } from 'react-router-dom';
import Users from './containers/Users/Users';
import Trucks from './containers/Trucks/Trucks';
import Logs from './containers/Logs/Logs';
import Dashboard from './containers/Dashboard/Dashboard';
import Signup from './containers/Sessions/Signup/Signup';
import Login from './containers/Sessions/Login/Login';
import Logout from './containers/Sessions/Logout/Logout';
import Home from './components/Home/Home';


class App extends Component {
  render() {

    return (

          <Layout>
            <Switch>
              <Route path="/users" component={ Users } />
              <Route path="/trucks" component={ Trucks } />
              <Route path="/logs" component={ Logs } />
              <Route path="/dashboard" component={ Dashboard } />
              <Route path="/signup" component={ Signup } />
              <Route path="/login" component={ Login } />
              <Route path="/" exact component={ Home } />
              <Route path="/logout" exact component={ Logout } />
            </Switch>
          </Layout>
    );
  }
}

export default App;
