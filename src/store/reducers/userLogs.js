import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
  logs: null,
  loading: false,
};

const getUserLogsFail = (state, action) => updateObject(state, {
  error: action.error,
  loading: false,
});

const getUserLogsSuccess = (state, action) => updateObject(state, {
  logs: action.logs,
  loading: false,
});

const getUserLogsStart = state => updateObject(state, { error: null, loading: true });


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_LOGS_START: return getUserLogsStart(state);
    case actionTypes.GET_USER_LOGS_SUCCESS: return getUserLogsSuccess(state, action);
    case actionTypes.GET_USER_LOGS_FAIL: return getUserLogsFail(state, action);

    default:
      return state;
  }
};

export default reducer;
