import * as actionTypes from './actionTypes';
import api from '../../services/api';
import * as functions from './functions';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});


export const authSuccess = (token, userId, role, response, motorCarrierId, vehicles, users) => ({
  type: actionTypes.AUTH_SUCCESS,
  token,
  userId,
  role,
  response,
  motorCarrierId,
  vehicles,
  users,
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const createSuccess = response => ({
  response,
  type: actionTypes.CREATE_SUCCESS,
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
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};


export const signup = data => (dispatch) => {
  dispatch(authStart());
  const authData = {
    email: data.email,
    password: data.password,
    first_name: data.firstName,
    last_name: data.lastName,
    username: data.username,
    account_type: data.accountType,
    motorCarrierId: data.motorCarrierId,
  };
  console.log(data);
  console.log(authData);

  api.people.signup(authData, data.token)
    .then((response) => {
      dispatch(createSuccess(response));
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};


export const login = (email, password) => (dispatch) => {
  dispatch(authStart());
  const authData = {
    email,
    password,
  };

  api.people.login(authData)
    .then((response) => {
      api.people.getUser(response.data.userId, response.data.id)
        .then((userResponse) => {
          api.motorCarriers.getMotorCarrierVehicles(
            userResponse.data.motorCarrierId,
            response.data.id,
          ).then((vehiclesResponse) => {
            api.motorCarriers.getMotorCarrierPeople(
              userResponse.data.motorCarrierId,
              response.data.id,
            ).then((peopleResponse) => {
              const usersObject = functions.arrayToObject(peopleResponse.data);
              const vehiclesObject = functions.arrayToObject(vehiclesResponse.data);
              dispatch(authSuccess(
                response.data.id,
                response.data.userId,
                userResponse.data.account_type,
                response,
                userResponse.data.motorCarrierId,
                vehiclesObject,
                usersObject,
              ));
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });

      console.log(response);
    })
    .catch((err) => {
      console.log(err.response);
      dispatch(authFail(err));
    });
};
