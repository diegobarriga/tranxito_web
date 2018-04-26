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
import CreateDriver from './containers/Forms/drivers/create_driver';
import CreateDrivers from './containers/Forms/drivers/create_drivers';
import CreateVehicle from './containers/Forms/vehicles/create_vehicle';
import CreateVehicles from './containers/Forms/vehicles/create_vehicles';
import Home from './components/Home/Home';

import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFileExcel from '@fortawesome/fontawesome-free-solid/faFileExcel';
import faUsers from '@fortawesome/fontawesome-free-solid/faUsers';
import faUser from '@fortawesome/fontawesome-free-solid/faUser';
import faCar from '@fortawesome/fontawesome-free-solid/faCar';

fontawesome.library.add(faFileExcel, faUser, faUsers, faCar);


class App extends Component {
  render() {

    return (

          <Layout>
            <Switch>
              <Route path="/drivers/new_drivers" component={ CreateDrivers } />
              <Route path="/drivers/new_driver" component={ CreateDriver } />
              <Route path="/vehicles/new_vehicles" component={ CreateVehicles } />
              <Route path="/vehicles/new_vehicle" component={ CreateVehicle } />
              <Route path="/drivers/:id" component={ User } />
              <Route path="/drivers" component={ Users } />
              <Route path="/vehicles" component={ Trucks } />
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
