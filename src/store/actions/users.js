import * as actionTypes from './actionTypes';
import api from '../../services/api';
import * as functions from './functions';

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

export const onDeleteSuccess = (userId, response) => ({
  type: actionTypes.DELETE_USER,
  userId,
  response,
});

export const delErrorReset = () => ({
  type: actionTypes.DEL_ERROR_RESET,
});


export const onDelete = (userId, token) => (dispatch) => {
  const data = {
    account_status: false,
  };

  api.people.updateUser(userId, token, data)
    .then((response) => {
      console.log(response);
      dispatch(delErrorReset());
      dispatch(onDeleteSuccess(userId, response));
    })
    .catch((err) => {
      console.log(err);
    });
};


export const getUsers = (token, motorCarrierId) => (dispatch) => {
  dispatch(getUsersStart());

  api.motorCarriers.getMotorCarrierPeople(motorCarrierId, token)
    .then((userResponse) => {
      console.log(userResponse.data);
      const userObject = functions.arrayToObject(userResponse.data);
      console.log(userObject);
      dispatch(getUsersSuccess(userObject));
    })
    .catch((err) => {
      console.log(err);
    });
};
