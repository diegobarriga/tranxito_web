import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
  loading: false,
  error: null,
};

const getDevicesFail = (state, action) => updateObject(state, {
  error: action.error,
  loading: false,
});

const getDevicesSuccess = (state, action) => updateObject(state, {
  devices: action.devices,
  loading: false,
});

const getDevicesStart = state => updateObject(state, { error: null, loading: true });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_DEVICES_START: return getDevicesStart(state);
    case actionTypes.GET_DEVICES_SUCCESS: return getDevicesSuccess(state, action);
    case actionTypes.GET_DEVICES_FAIL: return getDevicesFail(state, action);
    default:
      return state;
  }
};

export default reducer;
