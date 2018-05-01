import * as actionTypes from './actionTypes';
import getUserInfoService from '../../services/user-info';


export const getUserInfoStart = () => {
    return {
        type: actionTypes.GET_USER_INFO_START
    };
};

export const getUserInfoSuccess = ( user ) => {
    return {
        type: actionTypes.GET_USER_INFO_SUCCESS,
        user: user,
    };
};

export const getUserInfoFail = ( error ) => {
    return {
        type: actionTypes.GET_USER_INFO_FAIL,
        error: error,
    };
};

export const getUserInfo = (token, UserId) => {
  return dispatch => {
      dispatch(getUserInfoStart());
      getUserInfoService(token, UserId)
      .then( (response) => {
        try{
          const user = response.data
          dispatch(getUserInfoSuccess( user ));
        }
        catch(error){
          dispatch(getUserInfoFail());
        }

        }
      )
    }
}
