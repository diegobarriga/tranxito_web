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
  
  api.motorCarriers.deleteMotorCarrierDevice(motorCarrierId, deviceId, token)
    .then((response) => {
      
      dispatch(onDeviceDeleteSuccess(motorCarrierId, deviceId, response));
    })
    .catch((err) => {
      
    });
};

export const getDevices = (token, motorCarrierId) => (dispatch) => {
  dispatch(getDevicesStart());
  api.motorCarriers.getMotorCarrierDevices(motorCarrierId, token)
    .then((deviceResponse) => {
      
      dispatch(getDevicesSuccess(deviceResponse.data));
    })
    .catch((err) => {
      
    });
};
