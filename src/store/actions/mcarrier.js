import axios from 'axios';
import * as actionTypes from './actionTypes';


export const setMotorCarriers = motorcarriers => ({
  type: actionTypes.SET_MOTORCARRIER,
  motorCarriers: motorcarriers,
});


export const initMCarriers = token => (dispatch) => {
  axios.get(`https://e2e-eld-test.herokuapp.com/api/MotorCarriers?access_token=${token}`)
    .then((response) => {
      console.log(response.data);
      dispatch(setMotorCarriers(response.data));
    })

    .catch((error) => {
      console.log(error);
    });
};
