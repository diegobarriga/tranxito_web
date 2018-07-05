import * as actionTypes from './actionTypes';
import api from '../../services/api';

export const getDeviceStart = () => ({
  type: actionTypes.GET_DEVICE_START,
});

export const getDeviceSuccess = device => ({
  type: actionTypes.GET_DEVICE_SUCCESS,
  device,
});

export const getDeviceFail = error => ({
  type: actionTypes.GET_DEVICE_FAIL,
  error,
});

export const createDevice = device => ({
  type: actionTypes.CREATE_DEVICE,
  device,
});

export const getDevice = (token, deviceId) => (dispatch) => {
  console.log('entor a getdevice');
  dispatch(getDeviceStart());
  api.devices.getDevice(deviceId, token)
    .then((response) => {
      console.log(response);
      console.log('get device response');
      try {
        const device = response.data;
        dispatch(getDeviceSuccess(device));
      } catch (error) {
        dispatch(getDeviceFail());
      }
    });
};
