import * as actionTypes from './actionTypes';
import api from '../../services/api';
import * as functions from './functions';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const getMotorCarrierStart = () => ({
  type: actionTypes.GET_MOTOR_CARRIER_START,
});

export const getMotorCarrierSuccess = (
  motorCarrierId,
  vehicles,
  users,
  mcName,
  trailers,
  lastMod,
  devices,
) => ({
  type: actionTypes.GET_MOTOR_CARRIER_SUCCESS,
  motorCarrierId,
  vehicles,
  users,
  mcName,
  trailers,
  lastMod,
  devices,
});


export const authSuccess = (
  token,
  userId,
  role,
  response,
  motorCarrierId,
  trailers,
  vehicles,
  devices,
  users,
  image,
  firstName,
  lastName,
  mcName,
  lastMod,
  email,
  driverLicenseNumber,
) => ({
  type: actionTypes.AUTH_SUCCESS,
  token,
  userId,
  role,
  response,
  motorCarrierId,
  trailers,
  vehicles,
  devices,
  users,
  image,
  firstName,
  lastName,
  mcName,
  lastMod,
  email,
  driverLicenseNumber,
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const createUser = response => ({
  response,
  type: actionTypes.CREATE_USER,
});

export const updateLastMod = response => ({
  response,
  type: actionTypes.UPDATE_LASTMOD,
});

export const updateUsersStart = () => ({
  type: actionTypes.UPDATE_USERS_START,
});

export const updateUsersSuccess = users => ({
  type: actionTypes.UPDATE_USERS_SUCCESS,
  users,
});

export const updateUsersFail = error => ({
  type: actionTypes.UPDATE_USERS_FAIL,
  error,
});

export const updateVehiclesStart = () => ({
  type: actionTypes.UPDATE_VEHICLES_START,
});

export const updateVehiclesSuccess = vehicles => ({
  type: actionTypes.UPDATE_VEHICLES_SUCCESS,
  vehicles,
});

export const updateVehiclesFail = error => ({
  type: actionTypes.UPDATE_VEHICLES_FAIL,
  error,
});

export const errorReset = () => ({
  type: actionTypes.ERROR_RESET,
});

export const logout = () => ({
  type: actionTypes.AUTH_LOGOUT,
});

export const logoutToken = (token) => {
  api.people.logout(token)
    .then((response) => {
      
    })
    .catch((err) => {
      
    });
};

export const signup = data => (dispatch) => {
  dispatch(authStart());
  const authData = {
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    username: data.username,
    accountType: data.accountType,
    accountStatus: true,
  };
  
  

  api.motorCarriers.createMotorCarrierPeople(data.motorCarrierId, data.token, authData)
    .then((response) => {
      
      dispatch(createUser(response));
      
    })
    .catch((err) => {
      
    });
};

export const login = (email, password) => async (dispatch) => {
  dispatch(authStart());
  const authData = {
    email,
    password,
  };

  try {
    const response = await api.people.login(authData);
    const userResponse = await api.people.getUser(response.data.userId, response.data.id);
    

    if (userResponse.data.motorCarrierId && userResponse.data.accountType !== 'D') {
      const devicesResponse = await api.motorCarriers.getMotorCarrierDevices(
        userResponse.data.motorCarrierId,
        response.data.id,
      );

      const vehiclesResponse = await api.motorCarriers.getMotorCarrierVehicles(
        userResponse.data.motorCarrierId,
        response.data.id,
      );

      const trailersResponse = await api.motorCarriers.getMotorCarrierTrailers(
        userResponse.data.motorCarrierId,
        response.data.id,
      );

      const filter = '{"where": {"accountStatus": "true"}}';

      const peopleResponse = await api.motorCarriers.getMotorCarrierPeople(
        userResponse.data.motorCarrierId,
        response.data.id,
        filter,
      );
      const usersObject = functions.arrayToObject(peopleResponse.data);
      const vehiclesObject = functions.arrayToObject(vehiclesResponse.data);
      const devicesObject = functions.arrayToObject(devicesResponse.data);
      const trailersObject = functions.arrayToObject(trailersResponse.data);

      const mCresponse = await api.motorCarriers.getMotorCarrier(
        userResponse.data.motorCarrierId,
        response.data.id,
      );

      const lastModResponse = await api.lastMod.getLastMod(response.data.id);

      const lastMod = lastModResponse.status === 404 ? { people: '', vehicles: '', devices: '' } : lastModResponse.data[0];

      dispatch(authSuccess(
        response.data.id,
        userResponse.data.id,
        userResponse.data.accountType,
        response,
        userResponse.data.motorCarrierId,
        trailersObject,
        vehiclesObject,
        devicesObject,
        usersObject,
        userResponse.data.image,
        userResponse.data.firstName,
        userResponse.data.lastName,
        mCresponse.data.name,
        lastMod,
        userResponse.data.email,
        userResponse.data.driverLicenseNumber,
      ));
    } else {
      dispatch(authSuccess(
        response.data.id,
        userResponse.data.id,
        userResponse.data.accountType,
        response,
        null,
        null,
        null,
        null,
        null,
        userResponse.data.image,
        userResponse.data.firstName,
        userResponse.data.lastName,
        null,
        {},
        userResponse.data.email,
        userResponse.data.driverLicenseNumber,
      ));
    }
  } catch (err) {
    
    dispatch(authFail(err));
  }
};

export const getMotorCarrier = (motorCarrierId, token, motorCarrierName) => async (dispatch) => {
  dispatch(getMotorCarrierStart());
  
  const vehiclesResponse = await api.motorCarriers.getMotorCarrierVehicles(motorCarrierId, token);
  const trailersResponse = await api.motorCarriers.getMotorCarrierTrailers(motorCarrierId, token);
  const filter = '{"where": {"accountStatus": "true"}}';
  const peopleResponse = await api.motorCarriers.getMotorCarrierPeople(
    motorCarrierId,
    token,
    filter,
  );
  const devicesResponse = await api.motorCarriers.getMotorCarrierDevices(
    motorCarrierId,
    token,
  );

  const usersObject = functions.arrayToObject(peopleResponse.data);
  const vehiclesObject = functions.arrayToObject(vehiclesResponse.data);
  const trailersObject = functions.arrayToObject(trailersResponse.data);
  const devicesObject = functions.arrayToObject(devicesResponse.data);

  const lastModResponse = await api.lastMod.getLastMod(token);

  const lastMod = lastModResponse.status === 404 ? { people: '', vehicles: '', devices: '' } : lastModResponse.data[0];

  dispatch(getMotorCarrierSuccess(
    motorCarrierId,
    vehiclesObject,
    usersObject,
    motorCarrierName,
    trailersObject,
    lastMod,
    devicesObject,
  ));
};

export const updateUsers = (motorCarrierId, token) => (dispatch) => {
  
  dispatch(updateUsersStart());

  const filter = '{"where": {"accountStatus": "true"}}';
  api.motorCarriers.getMotorCarrierPeople(
    motorCarrierId,
    token,
    filter,
  ).then((peopleResponse) => {
    const usersObject = functions.arrayToObject(peopleResponse.data);
    dispatch(updateUsersSuccess(usersObject));
  }).catch((err) => {
    
    dispatch(updateUsersFail(err));
  });
};

export const updateVehicles = (motorCarrierId, token) => (dispatch) => {
  
  dispatch(updateVehiclesStart());

  api.motorCarriers.getMotorCarrierVehicles(
    motorCarrierId,
    token,
  ).then((vehiclesResponse) => {
    const vehiclesObject = functions.arrayToObject(vehiclesResponse.data);
    dispatch(updateVehiclesSuccess(vehiclesObject));
  }).catch((err) => {
    
    dispatch(updateVehiclesFail(err));
  });
};
