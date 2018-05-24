import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
  loading: false,
  error: null,
};

const getUsersFail = (state, action) => updateObject(state, {
  error: action.error,
  loading: false,
});

const delErrorReset = state => updateObject(state, { error: null });

const getUsersSuccess = (state, action) => updateObject(state, {
  users: action.users,
  loading: false,
});

const getUsersStart = state => updateObject(state, { error: null, loading: true });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USERS_START: return getUsersStart(state);
    case actionTypes.GET_USERS_SUCCESS: return getUsersSuccess(state, action);
    case actionTypes.GET_USERS_FAIL: return getUsersFail(state, action);
    case actionTypes.DEL_ERROR_RESET: return delErrorReset(state);
    default:
      return state;
  }
};

export default reducer;
