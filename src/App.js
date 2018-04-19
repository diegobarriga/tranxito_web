import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Users from './containers/Users/Users';
import Trucks from './containers/Trucks/Trucks';
import Logs from './containers/Logs/Logs';
import Dashboard from './containers/Dashboard/Dashboard';
import Signup from './containers/Sessions/Signup';
import Login from './containers/Sessions/Login';

class App extends Component {
  render() {

    return (       

          <Layout>
            <Switch>
              <Route path="/users" component={ Users } />
              <Route path="/trucks" component={ Trucks } />
              <Route path="/logs" component={ Logs } />
              <Route path="/" exact component={ Dashboard } />
              <Route path="/signup" component={ Signup } />
              <Route path="/login" component={ Login } />
            </Switch>
          </Layout>
    );
  }
}

export default App;
