import * as actionTypes from './actionTypes';
import api from '../../services/api';

export const getVehiclesStart = () => ({
  type: actionTypes.GET_VEHICLES_START,
});

export const getVehiclesSuccess = vehicles => ({
  type: actionTypes.GET_VEHICLES_SUCCESS,
  vehicles,
});

export const getVehiclesFail = error => ({
  type: actionTypes.GET_VEHICLES_FAIL,
  error,
});

export const onVehicleDeleteSuccess = (vehicleId, response) => ({
  type: actionTypes.DELETE_VEHICLE,
  vehicleId,
  response,
});

export const delVErrorReset = () => ({
  type: actionTypes.DELV_ERROR_RESET,
});

export const onVehicleDelete = (vehicleId, token) => (dispatch) => {
  
  api.vehicles.deleteVehicle(vehicleId, token)
    .then((response) => {
      
      dispatch(onVehicleDeleteSuccess(vehicleId, response));
    })
    .catch((err) => {
      
    });
};

export const getVehicles = (token, motorCarrierId) => (dispatch) => {
  dispatch(getVehiclesStart());
  api.motorCarriers.getMotorCarrierVehicles(motorCarrierId, token)
    .then((vehicleResponse) => {
      
      dispatch(getVehiclesSuccess(vehicleResponse.data));
    })
    .catch((err) => {
      
    });
};
