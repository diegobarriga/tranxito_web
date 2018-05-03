import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as path from '../../store/actions/basepath';

export const setMotorCarriers = motorcarriers => ({
  type: actionTypes.SET_MOTORCARRIER,
  motorCarriers: motorcarriers,
});

export const createSuccess = response => ({
  response,
  type: actionTypes.CREATE_SUCCESS,
});


export const initMCarriers = token => (dispatch) => {
  axios.get(`${path.BASE_PATH}/api/MotorCarriers?access_token=${token}`)
    .then((response) => {
      console.log(response.data);
      dispatch(setMotorCarriers(response.data));
    })

    .catch((error) => {
      console.log(error);
    });
};


export const carrierRegister = (name, USDOT_number, multiday_basis_used, token) => (dispatch) => {
  const regData = {
    name,
    USDOT_number,
    multiday_basis_used,
  };
  // const url = `https://eld-test.azurewebsites.net/api/MotorCarriers?access_token=${token}`;
  const url = `${path.BASE_PATH}/api/MotorCarriers?access_token=${token}`;

  console.log(regData);
  axios.post(url, regData)
    .then((response) => {
      dispatch(createSuccess());
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};
