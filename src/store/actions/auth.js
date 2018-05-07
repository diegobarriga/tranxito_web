import * as actionTypes from './actionTypes';
import api from '../../services/api';


export const authStart = () => ({
  type: actionTypes.AUTH_START,
});


export const authSuccess = (token, userId, role, response, motorCarrierId) => ({
  type: actionTypes.AUTH_SUCCESS,
  token,
  userId,
  role,
  response,
  motorCarrierId,
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


export const signup = (
  email,
  password,
  firstName,
  lastName,
  username,
  accounType,
  motorCarrierId,
  token,
) => (dispatch) => {
  dispatch(authStart());
  const authData = {
    email,
    password,
    first_name: firstName,
    last_name: lastName,
    username,
    account_type: accounType,
    motorCarrierId,
  };

  api.people.signup(authData, token)
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
          console.log(response);
          dispatch(authSuccess(
            response.data.id,
            response.data.userId,
            userResponse.data.account_type,
            response,
            userResponse.data.motorCarrierId,
          ));
        })
        .catch((err) => {
          console.log(err);
        });

      console.log(response);
    })
    .catch((err) => {
      console.log(err);
      dispatch(authFail(err));
    });
};
