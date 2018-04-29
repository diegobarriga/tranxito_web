import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});


export const authSuccess = (token, userId, role, motorCarrierId) => ({
  type: actionTypes.AUTH_SUCCESS,
  token,
  userId,
  role,
  motorCarrierId,

});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,

});


export const logout = () => ({
  type: actionTypes.AUTH_LOGOUT,
});


export const signup = (email, password, first_name, last_name, username, account_type, motorCarrierId) => (dispatch) => {
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


  const url = 'https://e2e-eld-test.herokuapp.com/api/People';

  console.log('POST REQUEST');
  console.log(authData);

  axios.post(url, authData)
    .then((response) => {
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
    returnSecureToken: true,
  };

  const url = 'https://e2e-eld-test.herokuapp.com/api/People/login';

  axios.post(url, authData)
    .then((response) => {
      const userUrl = `https://e2e-eld-test.herokuapp.com/api/People/${response.data.userId}?access_token=${response.data.id}`;
      axios.get(userUrl)
        .then((userResponse) => {
          console.log(response);
          dispatch(authSuccess(response.data.id, response.data.userId, userResponse.data.account_type, userResponse.data.motorCarrierId));
        })
        .catch((err) => {
          console.log(err);
        });

      console.log(response);
    })
    .catch((err) => {
      console.log(err);
      dispatch(authFail());
    });
};
