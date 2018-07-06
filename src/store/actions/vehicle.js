import * as actionTypes from './actionTypes';
import api from '../../services/api';

export const getVehicleStart = () => ({
  type: actionTypes.GET_VEHICLE_START,
});

export const getVehicleSuccess = vehicle => ({
  type: actionTypes.GET_VEHICLE_SUCCESS,
  vehicle,
});

export const getVehicleFail = error => ({
  type: actionTypes.GET_VEHICLE_FAIL,
  error,
});

export const createVehicle = vehicle => ({
  type: actionTypes.CREATE_VEHICLE,
  vehicle,
});


export const getVehicle = (token, vehicleId) => (dispatch) => {
  
  dispatch(getVehicleStart());
  api.vehicles.getVehicle(vehicleId, token)
    .then((response) => {
      
      
      try {
        const vehicle = response.data;
        dispatch(getVehicleSuccess(vehicle));
      } catch (error) {
        dispatch(getVehicleFail());
      }
    });
};
