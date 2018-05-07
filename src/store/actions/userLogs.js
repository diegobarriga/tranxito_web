import * as actionTypes from './actionTypes';
import api from '../../services/api';

export const getUserLogsStart = () => ({
  type: actionTypes.GET_USER_LOGS_START,
});

export const getUserLogsSuccess = logs => ({
  type: actionTypes.GET_USER_LOGS_SUCCESS,
  logs,
});

export const getUserLogsFail = error => ({
  type: actionTypes.GET_USER_LOGS_FAIL,
  error,
});

export const getUserLogs = (token, userId) => (dispatch) => {
  dispatch(getUserLogsStart());
  api.people.getUserEvents(userId, token)
    .then((response) => {
      try {
        const logs = response.data;
        dispatch(getUserLogsSuccess(logs));
      } catch (error) {
        dispatch(getUserLogsFail());
      }
    });
};
