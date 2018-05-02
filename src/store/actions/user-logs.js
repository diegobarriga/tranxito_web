import * as actionTypes from './actionTypes';
import getUserLogsService from '../../services/user-logs';


export const getUserLogsStart = () => {
    return {
        type: actionTypes.GET_USER_LOGS_START
    };
};

export const getUserLogsSuccess = ( logs ) => {
    return {
        type: actionTypes.GET_USER_LOGS_SUCCESS,
        logs: logs,
    };
};

export const getUserLogsFail = ( error ) => {
    return {
        type: actionTypes.GET_USER_LOGS_FAIL,
        error: error,
    };
};

export const getUserLogs = (token, UserId) => {
  return dispatch => {
      dispatch(getUserLogsStart());
      getUserLogsService(token, UserId)
      .then( (response) => {
        try{
          const logs = response.data
          dispatch(getUserLogsSuccess( logs ));
        }
        catch(error){
          dispatch(getUserLogsFail());
        }

        }
      )
    }
}
