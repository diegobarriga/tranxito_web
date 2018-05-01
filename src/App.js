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
import './assets/styles/App.css';
import Users from './containers/Users/Users';
import UserProfile from './containers/Users/UserProfile';
import Vehicles from './containers/Vehicles/Vehicles';
import Logs from './containers/Logs/Logs';
import Dashboard from './containers/Dashboard/Dashboard';
import LoginView from './containers/Forms/Sessions/Login/LoginView';
import SignupView from './containers/Forms/Sessions/Signup/SignupView';
import Logout from './containers/Forms/Sessions/Logout/Logout';
import CreateDriver from './containers/Forms/drivers/CreateDriver';
import EditDriver from './containers/Forms/drivers/EditDriver';
import CreateDrivers from './containers/Forms/drivers/CreateDrivers';
import CreateVehicle from './containers/Forms/vehicles/CreateVehicle';
import CreateVehicles from './containers/Forms/vehicles/CreateVehicles';
import EditVehicle from './containers/Forms/vehicles/EditVehicle';
import CreateMotorCarrier from './containers/Forms/MotorCarriers/CreateMotorCarrier';
import EditMotorCarrier from './containers/Forms/MotorCarriers/EditMotorCarrier';
import MotorCarriers from './containers/MotorCarriers/MotorCarriers';
import MotorCarrier from './containers/MotorCarriers/MotorCarrier';

fontawesome.library.add(
  faFileExcel, faUser, faUsers, faCar, faSearch, faTrash, faEdit, faClock,
  faLocationArrow, faTachometerAlt, faInfoCircle,
  faChartLine, faSignInAlt, faSignOutAlt, faUserCog, faUserTie,
  faBluetooth,
);

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/drivers/new_drivers" component={CreateDrivers} />
          <Route path="/drivers/new_driver" component={CreateDriver} />
          <Route path="/drivers/:id/edit" component={EditDriver} />
          <Route path="/drivers/:id" component={User} />
          <Route path="/drivers" component={Users} />
          <Route path="/vehicles/new_vehicles" component={CreateVehicles} />
          <Route path="/vehicles/new_vehicle" component={CreateVehicle} />
          <Route path="/vehicles/:id/edit" component={EditVehicle} />
          <Route path="/vehicles" component={Vehicles} />
          <Route path="/logs" component={Logs} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/signup" component={SignupView} />
          <Route path="/login" component={LoginView} />
          <Route path="/" exact component={LoginView} />
          <Route path="/logout" component={Logout} />
          <Route path="/motor_carriers/create" component={CreateMotorCarrier} />
          <Route path="/motor_carriers/:id/edit" component={EditMotorCarrier} />
          <Route path="/motor_carriers/:id/new_supervisor" component={SignupView} />
          <Route path="/motor_carriers/:id" component={MotorCarrier} />
          <Route path="/motor_carriers" component={MotorCarriers} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
