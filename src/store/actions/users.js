import * as actionTypes from './actionTypes';
import getUsersService from '../../services/users';
import axios from 'axios';

export const getUsersStart = () => {
    return {
        type: actionTypes.GET_USERS_START
    };
};


export const getUsersSuccess = ( users ) => {

    return {
        type: actionTypes.GET_USERS_SUCCESS,
        users: users,
    };
};

export const getUsersFail = ( error ) => {
    return {
        type: actionTypes.GET_USERS_FAIL,
        error: error

    };
};



export const getUsers = (token, motorCarrierId) => {
  return dispatch => {

      dispatch(getUsersStart());
      getUsersService(token, motorCarrierId)
      .then( (response) => {
        try{
          const users = response.data.json()
          dispatch(getUsersSuccess( users ))
        }
        catch(error){
          dispatch(getUsersFail());
        }

        }
      )
    }
}
