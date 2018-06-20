import * as actionTypes from './actionTypes';
import api from '../../services/api';
import * as functions from './functions';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});


export const authSuccess = (
  token,
  userId,
  role,
  response,
  motorCarrierId,
  vehicles,
  users,
  supervisors,
  image,
  firstName,
  lastName,
  mcName,
  email,
  driverLicenseNumber,
) => ({
  type: actionTypes.AUTH_SUCCESS,
  token,
  userId,
  role,
  response,
  motorCarrierId,
  vehicles,
  users,
  supervisors,
  image,
  firstName,
  lastName,
  mcName,
  email,
  driverLicenseNumber,
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
    firstName: data.firstName,
    lastName: data.lastName,
    username: data.username,
    accountType: data.accountType,
    accountStatus: true,
  };
  console.log(data);
  console.log(authData);

  api.motorCarriers.createMotorCarrierPeople(data.motorCarrierId, data.token, authData)
    .then((response) => {
      console.log(response);
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
          console.log(userResponse.data);
          if (userResponse.data.motorCarrierId && userResponse.data.accountType !== 'D') {
            api.motorCarriers.getMotorCarrierVehicles(
              userResponse.data.motorCarrierId,
              response.data.id,
            ).then((vehiclesResponse) => {
              const filter = '{"where": {"accountStatus": "true"}}';
              api.motorCarriers.getMotorCarrierPeople(
                userResponse.data.motorCarrierId,
                response.data.id,
                filter,
              ).then((peopleResponse) => {
                const supervisors = peopleResponse.data.filter(user => (
                  user.accountType === 'S'
                ));
                const usersObject = functions.arrayToObject(peopleResponse.data);
                const vehiclesObject = functions.arrayToObject(vehiclesResponse.data);
                const supervisorsObject = functions.arrayToObject(supervisors);
                api.motorCarriers.getMotorCarrier(
                  userResponse.data.motorCarrierId,
                  response.data.id,
                ).then((mCresponse) => {
                  dispatch(authSuccess(
                    response.data.id,
                    userResponse.data.id,
                    userResponse.data.accountType,
                    response,
                    userResponse.data.motorCarrierId,
                    vehiclesObject,
                    usersObject,
                    supervisorsObject,
                    userResponse.data.image,
                    userResponse.data.firstName,
                    userResponse.data.lastName,
                    mCresponse.data.name,
                    userResponse.data.email,
                    userResponse.data.driverLicenseNumber,
                  ));
                });
              });
            });
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
              userResponse.data.image,
              userResponse.data.firstName,
              userResponse.data.lastName,
              null,
              userResponse.data.email,
              userResponse.data.driverLicenseNumber,
            ));
          }
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
