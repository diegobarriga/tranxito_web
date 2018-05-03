import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './containers/Layout/Layout';
import Signup from './containers/Sessions/Signup/Signup';
import './assets/styles/App.css';
import Drivers from './containers/Users/Users';
import Driver from './containers/Users/User';
import Vehicles from './containers/Trucks/Trucks';


import Logs from './containers/Logs/Logs';
import Dashboard from './containers/Dashboard/Dashboard';
import Logout from './containers/Sessions/Logout/Logout';
import CreateDriver from './containers/Forms/drivers/create_driver';
import CreateDrivers from './containers/Forms/drivers/create_drivers';
import EditDriver from './containers/Forms/drivers/edit_driver';
import CreateVehicles from './containers/Forms/vehicles/create_vehicles';
import CreateVehicle from './containers/Forms/vehicles/create_vehicle';
import EditVehicle from './containers/Forms/vehicles/edit_vehicle';

import Login from './containers/Sessions/Login/Login';
import Home from './components/Home/Home';
import MotorCarriers from './containers/MotorCarriers/MotorCarriers';
import MotorCarrier from './containers/MotorCarriers/MotorCarrier';
import mForm from './containers/MotorCarriers/mForm';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import fontawesome from '@fortawesome/fontawesome';
import faFileExcel from '@fortawesome/fontawesome-free-solid/faFileExcel';
import faUsers from '@fortawesome/fontawesome-free-solid/faUsers';
import faUser from '@fortawesome/fontawesome-free-solid/faUser';
import faCar from '@fortawesome/fontawesome-free-solid/faCar';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash';
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit';

fontawesome.library.add(faFileExcel, faUser, faUsers, faCar, faSearch, faTrash, faEdit);


class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/drivers/new_drivers" component={CreateDrivers} />
          <Route path="/drivers/new_driver" component={CreateDriver} />
          <Route path="/drivers/:id/edit" component={EditDriver} />
          <Route path="/drivers/:id" component={Driver} />
          <Route path="/drivers" component={Drivers} />
          <Route path="/vehicles/new_vehicles" component={CreateVehicles} />
          <Route path="/vehicles/new_vehicle" component={CreateVehicle} />
          <Route path="/vehicles/:id/edit" component={EditVehicle} />
          <Route path="/vehicles" component={Vehicles} />
          <Route path="/logs" component={Logs} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/signup" component={Signup} />
          
          <Route path="/" exact component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/motor_carriers/create" component={mForm} />
          <Route path="/motor_carriers/:id/new_supervisor" component={Signup} />
          <Route path="/motor_carriers/:id" component={MotorCarrier} />
          <Route path="/motor_carriers" component={MotorCarriers} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
