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

export const onDeleteUserSuccess = (userId, response) => ({
  type: actionTypes.USER_DELETE,
  userId,
  response,
});

export const onDelete = (userId, token) => (dispatch) => {
  api.people.deleteUser(userId, token)
    .then((response) => {
      
      dispatch(onDeleteUserSuccess(userId, response));
    })
    .catch((err) => {
      
    });
};

export const createUser = user => ({
  type: actionTypes.CREATE_USER,
  user,
});

export const getUsers = (token, motorCarrierId) => (dispatch) => {
  dispatch(getUsersStart());

  api.motorCarriers.getMotorCarrierPeople(motorCarrierId, token)
    .then((userResponse) => {
      
      const userObject = functions.arrayToObject(userResponse.data);
      
      dispatch(getUsersSuccess(userObject));
    })
    .catch((err) => {
      
    });
};
