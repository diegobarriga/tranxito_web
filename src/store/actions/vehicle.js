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

export const getVehicle = (token, vehicleId) => (dispatch) => {
  console.log('entor a getvehicle');
  dispatch(getVehicleStart());
  api.vehicles.getVehicle(vehicleId, token)
    .then((response) => {
      console.log(response);
      console.log("get vehicle response");
      try {
        const vehicle = response.data;
        dispatch(getVehicleSuccess(vehicle));
      } catch (error) {
        dispatch(getVehicleFail());
      }
    });
};
