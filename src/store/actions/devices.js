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

export const onDeviceDeleteSuccess = (deviceId, response) => ({
  type: actionTypes.DELETE_DEVICE,
  deviceId,
  response,
});

export const delVErrorReset = () => ({
  type: actionTypes.DELV_ERROR_RESET,
});


export const onDeviceDelete = (deviceId, token) => (dispatch) => {
  console.log(deviceId);
  api.devices.deleteDevice(deviceId, token)
    .then((response) => {
      console.log(response);
      dispatch(onDeviceDeleteSuccess(deviceId, response));
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
