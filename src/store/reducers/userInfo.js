import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
  user: null,
  loading: false,
};

const getUserInfoFail = (state, action) => updateObject(state, {
  error: action.error,
  loading: false,
});
const getUserInfoSuccess = (state, action) => updateObject(state, {
  user: action.user,
  loading: false,
});

const getUserInfoStart = state => updateObject(state, { error: null, loading: true });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_INFO_START: return getUserInfoStart(state, action);
    case actionTypes.GET_USER_INFO_SUCCESS: return getUserInfoSuccess(state);
    case actionTypes.GET_USER_INFO_FAIL: return getUserInfoFail(state, action);

    default:
      return state;
  }
};

export default reducer;
