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
import faHdd from '@fortawesome/fontawesome-free-solid/faHdd';
import faSignOutAlt from '@fortawesome/fontawesome-free-solid/faSignOutAlt';
import faSignInAlt from '@fortawesome/fontawesome-free-solid/faSignInAlt';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';
import faAddressCard from '@fortawesome/fontawesome-free-solid/faAddressCard';
import faSortNumericDown from '@fortawesome/fontawesome-free-solid/faSortNumericDown';
import faSortNumericUp from '@fortawesome/fontawesome-free-solid/faSortNumericUp';
import faSortAlphaUp from '@fortawesome/fontawesome-free-solid/faSortAlphaUp';
import faSortAlphaDown from '@fortawesome/fontawesome-free-solid/faSortAlphaDown';
import faFilter from '@fortawesome/fontawesome-free-solid/faFilter';
import faSortUp from '@fortawesome/fontawesome-free-solid/faSortUp';
import faSortDown from '@fortawesome/fontawesome-free-solid/faSortDown';
import faSort from '@fortawesome/fontawesome-free-solid/faSort';
import faExclamationTriangle from '@fortawesome/fontawesome-free-solid/faExclamationTriangle';


import Layout from './containers/Layout/Layout';
import './assets/styles/App.css';
import Users from './containers/Users/Users';
import User from './containers/Users/User';
import Vehicles from './containers/Vehicles/Vehicles';
import Vehicle from './containers/Vehicles/Vehicle';
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
import Supervisors from './containers/Supervisors/Supervisors';

fontawesome.library.add(
  faFileExcel, faUser, faUsers, faCar, faSearch, faTrash, faEdit, faClock,
  faLocationArrow, faTachometerAlt, faInfoCircle, faSortAlphaUp, faSortAlphaDown,
  faChartLine, faSignInAlt, faSignOutAlt, faSortNumericDown, faSortNumericUp,
  faUserCog, faUserTie, faHdd, faEnvelope, faAddressCard, faFilter,
  faSortUp, faSortDown, faSort, faExclamationTriangle,
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
          <Route path="/vehicles/:id" component={Vehicle} />
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
          <Route path="/supervisors/:id/new_supervisor" component={SignupView} />
          <Route path="/supervisors" component={Supervisors} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
