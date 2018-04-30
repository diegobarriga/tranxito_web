import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});


export const authSuccess = (token, userId, role, response) => ({
  type: actionTypes.AUTH_SUCCESS,
  token,
  userId,
  role,
  response,

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


export const carrierRegister = (name, number, mday, token) => (dispatch) => {
  const regData = {
    name,
    number,
    mday,
  };

  const url = `https://e2e-eld-test.herokuapp.com/api/MotorCarriers?access_token=${token}`;

  axios.post(url, regData)
    .then((response) => {
      dispatch(createSuccess());
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};


export const signup = (
  email,
  password,
  first_name,
  last_name,
  username,
  account_type,
  motorCarrierId,
  token,
) => (dispatch) => {
  dispatch(authStart());
  const authData = {
    email,
    password,
    first_name,
    last_name,
    username,
    account_type,
    motorCarrierId,
  };


  const url = `https://e2e-eld-test.herokuapp.com/api/People?access_token=${token}`;


  console.log(authData);
  axios.post(url, authData)
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

  const url = 'https://e2e-eld-test.herokuapp.com/api/People/login';

  axios.post(url, authData, { headers: { 'Access-Control-Allow-Origin': '*' } })
    .then((response) => {
      const userUrl = `https://e2e-eld-test.herokuapp.com/api/People/${response.data.userId}?access_token=${response.data.id}`;
      axios.get(userUrl)
        .then((userResponse) => {
          console.log(response);
          dispatch(authSuccess(response.data.id, response.data.userId, userResponse.data.account_type, response));
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
