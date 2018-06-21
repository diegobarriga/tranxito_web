import * as actionTypes from './actionTypes';
import api from '../../services/api';
import * as functions from './functions';

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

export const onDeleteSuccess = (mCarrierId, response) => ({
  type: actionTypes.DELETE_MCARRIER,
  mCarrierId,
  response,
});

export const deleteMotorCarrier = (mCarrierId, token) => (dispatch) => {
  api.motorCarriers.deleteMotorCarrier(mCarrierId, token)
    .then((response) => {
      dispatch(onDeleteSuccess(mCarrierId, response));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const initMCarriers = token => (dispatch) => {
  api.motorCarriers.getMotorCarriers(token)
    .then((response) => {
      console.log(response.data);
      const mCarrierObject = functions.arrayToObject(response.data);
      console.log(mCarrierObject);
      dispatch(setMotorCarriers(mCarrierObject));
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
      .catch((error) => {
        console.log(error);
        dispatch(createMCFail(error));
      });
  } else {
    api.motorCarriers.updateMotorCarrier(id, data, token)
      .then((response) => {
        console.log(response);
        dispatch(createMCSuccess(data, response));
      })
      .catch((error) => {
        console.log(error);
        dispatch(createMCFail(error));
      });
  }
};
