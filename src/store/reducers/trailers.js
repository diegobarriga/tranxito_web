import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
  loading: false,
  error: null,
};

const getTrailersFail = (state, action) => updateObject(state, {
  error: action.error,
  loading: false,
});

const getTrailersSuccess = (state, action) => updateObject(state, {
  trailers: action.trailers,
  loading: false,
});

const getTrailersStart = state => updateObject(state, { error: null, loading: true });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TRAILERS_START: return getTrailersStart(state);
    case actionTypes.GET_TRAILERS_SUCCESS: return getTrailersSuccess(state, action);
    case actionTypes.GET_TRAILERS_FAIL: return getTrailersFail(state, action);
    default:
      return state;
  }
};

export default reducer;
