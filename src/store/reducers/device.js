import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
  device: null,
  loading: false,
};

const getDeviceFail = (state, action) => updateObject(state, {
  error: action.error,
  loading: false,
});
const getDeviceSuccess = (state, action) => updateObject(state, {
  device: action.device,
  loading: false,
});

const getDeviceStart = state => updateObject(state, { error: null, loading: true });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_DEVICE_START: return getDeviceStart(state);
    case actionTypes.GET_DEVICE_SUCCESS: return getDeviceSuccess(state, action);
    case actionTypes.GET_DEVICE_FAIL: return getDeviceFail(state, action);

    default:
      return state;
  }
};

export default reducer;
