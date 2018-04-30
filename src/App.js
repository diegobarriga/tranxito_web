import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import fontawesome from '@fortawesome/fontawesome';
import faFileExcel from '@fortawesome/fontawesome-free-solid/faFileExcel';
import faUsers from '@fortawesome/fontawesome-free-solid/faUsers';
import faUser from '@fortawesome/fontawesome-free-solid/faUser';
import faCar from '@fortawesome/fontawesome-free-solid/faCar';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash';
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit';

import faInfoCircle from '@fortawesome/fontawesome-free-solid/faInfoCircle';
import faClock from '@fortawesome/fontawesome-free-solid/faClock';
import faLocationArrow from '@fortawesome/fontawesome-free-solid/faLocationArrow';

import faUserCog from '@fortawesome/fontawesome-free-solid/faUserCog';
import faTachometerAlt from '@fortawesome/fontawesome-free-solid/faTachometerAlt';
import faUserTie from '@fortawesome/fontawesome-free-solid/faUserTie';
import faChartLine from '@fortawesome/fontawesome-free-solid/faChartLine';
import faBluetooth from '@fortawesome/fontawesome-free-brands/faBluetooth';

import faSignOutAlt from '@fortawesome/fontawesome-free-solid/faSignOutAlt';
import faSignInAlt from '@fortawesome/fontawesome-free-solid/faSignInAlt';

import Layout from './containers/Layout/Layout';
import Signup from './containers/Sessions/Signup/Signup';
import './assets/styles/App.css';
import Drivers from './containers/Users/Users';
import Driver from './containers/Users/User';
import Vehicles from './containers/Trucks/Trucks';
import Vehicle from './containers/Trucks/Truck';

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
// import Home from './components/Home/Home';
import MotorCarriers from './containers/MotorCarriers/MotorCarriers';
import MotorCarrier from './containers/MotorCarriers/MotorCarrier';
import mForm from './containers/MotorCarriers/mForm';

fontawesome.library.add(
  faFileExcel, faUser, faUsers, faCar, faSearch, faTrash, faEdit, faClock,
  faLocationArrow, faTachometerAlt, faInfoCircle, faUserCog, faUserTie,
  faBluetooth, faChartLine, faSignInAlt, faSignOutAlt,
);

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
          <Route path="/vehicles/:id" component={Vehicle} />
          <Route path="/vehicles" component={Vehicles} />
          <Route path="/logs" component={Logs} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
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
