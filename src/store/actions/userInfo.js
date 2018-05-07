import * as actionTypes from './actionTypes';
import api from '../../services/api';

export const getUserInfoStart = () => ({
  type: actionTypes.GET_USER_INFO_START,
});

export const getUserInfoSuccess = user => ({
  type: actionTypes.GET_USER_INFO_SUCCESS,
  user,
});

export const getUserInfoFail = error => ({
  type: actionTypes.GET_USER_INFO_FAIL,
  error,
});

export const getUserInfo = (token, userId) => (dispatch) => {
  dispatch(getUserInfoStart());
  api.people.getUser(userId, token)
    .then((response) => {
      try {
        const user = response.data;
        dispatch(getUserInfoSuccess(user));
      } catch (error) {
        dispatch(getUserInfoFail());
      }
    });
};
