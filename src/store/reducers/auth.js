import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  role: null,
  motorCarrierId: null,
};

const authStart = (state, action) => updateObject(state, { error: null, loading: true });

const errorReset = (state, action) => updateObject(state, { error: null });

const createSuccess = (state, action) => updateObject(state, {
  loading: false,
  error: action.response,
});

const authLogout = (state, action) => updateObject(state, {
  token: null,
  userId: null,
  role: null,
});

const authSuccess = (state, action) => updateObject(state, {
  token: action.token,
  userId: action.userId,
  role: action.role,
  error: null,
  loading: false,
  motorCarrierId: action.motorCarrierId,
});


const authFail = (state, action) => updateObject(state, {
  error: action.error,
  loading: false,
});


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.CREATE_SUCCESS: return createSuccess(state, action);
    case actionTypes.ERROR_RESET: return errorReset(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);

    default:
      return state;
  }
};

export default reducer;
