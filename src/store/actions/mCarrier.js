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


export const carrierRegister = (name, usdotNumber, multidayBasisUsed, token) => (dispatch) => {
  dispatch(createMCarrierStart());
  const regData = {
    name,
    USDOT_number: usdotNumber,
    multiday_basis_used: multidayBasisUsed,
  };

  api.motorCarriers.createMotorCarrier(regData, token)
    .then((response) => {
      console.log(response);
      dispatch(createMCSuccess(regData, response));
    })
    .catch((err) => {
      console.log(err);
      dispatch(createMCFail());
    });
};
