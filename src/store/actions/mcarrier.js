import * as actionTypes from './actionTypes';
import api from '../../services/api';

export const setMotorCarriers = motorcarriers => ({
  type: actionTypes.SET_MOTORCARRIER,
  motorCarriers: motorcarriers,
});

export const createMCarrierStart = () => ({
  type: actionTypes.START_MCCREATE,
});

export const createMCSuccess = regData => ({
  regData,
  type: actionTypes.CREATEMC_SUCCESS,
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


export const carrierRegister = (name, USDOT_number, multiday_basis_used, token) => (dispatch) => {
  dispatch(createMCarrierStart());
  const regData = {
    name,
    USDOT_number,
    multiday_basis_used,
  };

  api.motorCarriers.createMotorCarrier(regData, token)
    .then((response) => {
      console.log(response.data);
      dispatch(createMCSuccess(regData));
    })
    .catch((err) => {
      console.log(err);
    });
};
