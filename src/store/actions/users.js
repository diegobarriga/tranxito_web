import axios from 'axios';
import * as actionTypes from './actionTypes';

export const getUsersStart = () => ({
  type: actionTypes.GET_USERS_START,
});


export const getUsersSuccess = users => ({
  type: actionTypes.GET_USERS_SUCCESS,
  users,
});

export const getUsersFail = error => ({
  type: actionTypes.GET_USERS_FAIL,
  error,
});


export const getUsers = (token, motorCarrierId) => (dispatch) => {
  dispatch(getUsersStart());
  const userUrl = `https://e2e-eld-test.herokuapp.com/api/MotorCarriers/${motorCarrierId}/people?access_token=${token}`;
  axios.get(userUrl)
    .then((userResponse) => {
      console.log(userResponse);
      dispatch(getUsersSuccess(userResponse.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

  /*
  getUsersService(token, motorCarrierId)
    .then((response) => {
      try {
        // const users = response.data.json()
        const users = response;
        console.log(users);
        dispatch(getUsersSuccess(users));
      } catch (error) {
        console.log(error);
        dispatch(getUsersFail());
      }
    });
    */
