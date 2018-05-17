import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
  vehicle: null,
  loading: false,
};

const getVehicleFail = (state, action) => updateObject(state, {
  error: action.error,
  loading: false,
});
const getVehicleSuccess = (state, action) => updateObject(state, {
  vehicle: action.vehicle,
  loading: false,
});

const getVehicleStart = state => updateObject(state, { error: null, loading: true });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_VEHICLE_START: return getVehicleStart(state);
    case actionTypes.GET_VEHICLE_SUCCESS: return getVehicleSuccess(state, action);
    case actionTypes.GET_VEHICLE_FAIL: return getVehicleFail(state, action);

    default:
      return state;
  }
};

export default reducer;
