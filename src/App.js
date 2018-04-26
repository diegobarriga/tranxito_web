import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import './assets/styles/App.css';
import { Route, Switch } from 'react-router-dom';
import Users from './containers/Users/Users';
import User from './containers/Users/User';
import Trucks from './containers/Trucks/Trucks';
import Logs from './containers/Logs/Logs';
import Dashboard from './containers/Dashboard/Dashboard';
import Signup from './containers/Sessions/Signup/Signup';
import Login from './containers/Sessions/Login/Login';
import Logout from './containers/Sessions/Logout/Logout';
import CreateUser from './containers/Forms/users/create_user';
import Home from './components/Home/Home';

import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFileExcel from '@fortawesome/fontawesome-free-solid/faFileExcel';
import faUsers from '@fortawesome/fontawesome-free-solid/faUsers';
import faUser from '@fortawesome/fontawesome-free-solid/faUser';

fontawesome.library.add(faFileExcel, faUser, faUsers);


class App extends Component {
  render() {

    return (

          <Layout>
            <Switch>
              <Route path="/users/new_user" component={ CreateUser } />
              <Route path="/users/:id" component={ User } />
              <Route path="/users" component={ Users } />
              <Route path="/trucks" component={ Trucks } />
              <Route path="/logs" component={ Logs } />
              <Route path="/dashboard" component={ Dashboard } />
              <Route path="/signup" component={ Signup } />
              <Route path="/login" component={ Login } />
              <Route path="/" exact component={ Home } />
              <Route path="/logout" component={ Logout } />
            </Switch>
          </Layout>
    );
  }
}

export default App;
