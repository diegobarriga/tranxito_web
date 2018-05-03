import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as path from '../../store/actions/basepath';

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

export const onDeleteSuccess = userId => ({
  type: actionTypes.DELETE_USER,
  userId,
});


export const onDelete = (userId, token) => (dispatch) => {
  const data = {
    account_status: false,
  }
  const url = `${path.BASE_PATH}/api/People/${userId}?access_token=${token}`;
  axios.patch(url, data)
  .then((response) => {
    console.log("userdeleted")
    console.log(response);
    dispatch(onDeleteSuccess(userId));

  })
  .catch((err) => {
    console.log(err);
  });
};


export const getUsers = (token, motorCarrierId) => (dispatch) => {
  dispatch(getUsersStart());
  const userUrl = `${path.BASE_PATH}/api/MotorCarriers/${motorCarrierId}/people?access_token=${token}`;
  axios.get(userUrl)
    .then((userResponse) => {
      console.log(userResponse);
      dispatch(getUsersSuccess(userResponse.data));
    })
    .catch((err) => {
      console.log(err);
    });
};
