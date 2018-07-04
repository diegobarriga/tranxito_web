import * as actionTypes from './actionTypes';
import api from '../../services/api';

export const getDevicesStart = () => ({
  type: actionTypes.GET_DEVICES_START,
});

export const getDevicesSuccess = devices => ({
  type: actionTypes.GET_DEVICES_SUCCESS,
  devices,
});

export const getDevicesFail = error => ({
  type: actionTypes.GET_DEVICES_FAIL,
  error,
});

export const onDeviceDeleteSuccess = (motorCarrierId, deviceId, response) => ({
  type: actionTypes.DELETE_DEVICE,
  motorCarrierId,
  deviceId,
  response,
});

export const delVErrorReset = () => ({
  type: actionTypes.DELV_ERROR_RESET,
});


export const onDeviceDelete = (motorCarrierId, deviceId, token) => (dispatch) => {
  console.log(deviceId);
  api.motorCarriers.deleteMotorCarrierDevice(motorCarrierId, deviceId, token)
    .then((response) => {
      console.log(response);
      dispatch(onDeviceDeleteSuccess(motorCarrierId, deviceId, response));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getDevices = (token, motorCarrierId) => (dispatch) => {
  dispatch(getDevicesStart());
  api.motorCarriers.getMotorCarrierDevices(motorCarrierId, token)
    .then((deviceResponse) => {
      console.log(deviceResponse);
      dispatch(getDevicesSuccess(deviceResponse.data));
    })
    .catch((err) => {
      console.log(err);
    });
};
