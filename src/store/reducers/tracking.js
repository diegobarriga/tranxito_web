import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
  tracking: {},
  loading: false,
};

const getTrackingInfoFail = (state, action) => updateObject(state, {
  error: action.error,
  loading: false,
});
const getTrackingInfoSuccess = (state, action) => updateObject(state, {
  tracking: action.trackings,
  loading: false,
});

const getTrackingInfoStart = state => updateObject(state, { error: null, loading: true });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TRACKING_INFO_START: return getTrackingInfoStart(state);
    case actionTypes.GET_TRACKING_INFO_SUCCESS: return getTrackingInfoSuccess(state, action);
    case actionTypes.GET_TRACKING_INFO_FAIL: return getTrackingInfoFail(state, action);

    default:
      return state;
  }
};

export default reducer;
