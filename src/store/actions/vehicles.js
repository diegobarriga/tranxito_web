import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as path from '../../store/actions/basepath';

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
  const url = `${path.BASE_PATH}/api/Vehicles/${vehicleId}?access_token=${token}`;
  axios.delete(url)
  .then((response) => {
    console.log("vehicledeleted");
    dispatch(onVehicleDeleteSuccess(vehicleId));

  })
  .catch((err) => {
    console.log(err);
  });
};





export const getVehicles = (token, motorCarrierId) => (dispatch) => {
  dispatch(getVehiclesStart());
  const vehicleUrl = `${path.BASE_PATH}/api/MotorCarriers/${motorCarrierId}/vehicles?access_token=${token}`;
  axios.get(vehicleUrl)
    .then((vehicleResponse) => {
      console.log(vehicleResponse);
      dispatch(getVehiclesSuccess(vehicleResponse.data));
    })
    .catch((err) => {
      console.log(err);
    });
};
