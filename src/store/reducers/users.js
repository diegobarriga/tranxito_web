import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    users: [],
    loadingUsers: false
}

const getUsersFail = (state, action) => {
  return updateObject( state, { error: action.error, loading: false } )

}
const getUsersSuccess = (state, action) => {
  return updateObject( state, { users: action.users, loading: false } )
}

const getUsersStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } )
}


const reducer = ( state = initialState, action ) => {

    switch (action.type){
        case actionTypes.GET_USERS_START: return getUsersStart(state, action);
        case actionTypes.GET_USERS_SUCCESS: return getUsersSuccess(state, action);
        case actionTypes.GET_USERS_FAIL: return getUsersFail(state, action);

        default:
            return state;

    }
}

export default reducer;
