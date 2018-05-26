import * as actionTypes from './actionTypes';
import api from '../../services/api';

export const setMotorCarriers = motorcarriers => ({
  type: actionTypes.SET_MOTORCARRIER,
  motorCarriers: motorcarriers,
});

export const createMCarrierStart = () => ({
  type: actionTypes.START_MCCREATE,
});

export const createMCSuccess = (regData, response) => ({
  regData,
  response,
  type: actionTypes.CREATEMC_SUCCESS,
});

export const createMCFail = error => ({
  type: actionTypes.MCARRIER_CREATE_FAIL,
  error,
});

export const initMCarriers = token => (dispatch) => {
  api.motorCarriers.getMotorCarriers(token)
    .then((response) => {
      console.log(response.data);
      dispatch(setMotorCarriers(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};


export const carrierRegister = (data, token, isCreate, id) => (dispatch) => {
  dispatch(createMCarrierStart());

  if (isCreate) {
    api.motorCarriers.createMotorCarrier(data, token)
      .then((response) => {
        console.log(response);
        dispatch(createMCSuccess(data, response));
      })
      .catch((err) => {
        console.log(err);
        dispatch(createMCFail());
      });
  } else {
    api.motorCarriers.updateMotorCarrier(id, data, token)
      .then((response) => {
        console.log(response);
        dispatch(createMCSuccess(data, response));
      })
      .catch((err) => {
        console.log(err);
        dispatch(createMCFail());
      });
  }
};
