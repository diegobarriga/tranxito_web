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

export const onVehicleDeleteSuccess = vehicleId => ({
  type: actionTypes.DELETE_VEHICLE,
  vehicleId,
});


export const onVehicleDelete = (vehicleId, token) => (dispatch) => {
  api.vehicles.deleteVehcle(vehicleId, token)
    .then(() => {
      console.log('vehicledeleted');
      dispatch(onVehicleDeleteSuccess(vehicleId));
    })
    .catch((err) => {
      console.log(err);
    });
};


export const getVehicles = (token, motorCarrierId) => (dispatch) => {
  dispatch(getVehiclesStart());
  api.motorCarriers.getMotorCarrierVehicles(motorCarrierId, token)
    .then((vehicleResponse) => {
      console.log(vehicleResponse);
      dispatch(getVehiclesSuccess(vehicleResponse.data));
    })
    .catch((err) => {
      console.log(err);
    });
};
