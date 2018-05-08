import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
  vehicles: [],
  loading: false,
};

const getVehiclesFail = (state, action) => updateObject(state, {
  error: action.error,
  loading: false,
});

const getVehiclesSuccess = (state, action) => updateObject(state, {
  vehicles: action.vehicles,
  loading: false,
});

const getVehiclesStart = state => updateObject(state, { error: null, loading: true });


const onVehicleDeleteSuccess = (state, action) => {
  const otherVehicle = state.vehicles.filter(vehicle => vehicle.id !== action.vehicleId);
  return updateObject(state, {
    loading: false,
    vehicles: [...otherVehicle],
  });
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_VEHICLES_START: return getVehiclesStart(state);
    case actionTypes.GET_VEHICLES_SUCCESS: return getVehiclesSuccess(state, action);
    case actionTypes.GET_VEHICLES_FAIL: return getVehiclesFail(state, action);
    case actionTypes.DELETE_VEHICLE: return onVehicleDeleteSuccess(state, action);

    default:
      return state;
  }
};

export default reducer;
