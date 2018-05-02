import axios from 'axios';
import * as actionTypes from './actionTypes';


export const getVehiclesStart = () => {
    return {
        type: actionTypes.GET_VEHICLES_START
    };
};


export const getVehiclesSuccess = ( vehicles ) => {
    return {
        type: actionTypes.GET_VEHICLES_SUCCESS,
        vehicles: vehicles,
    };
};

export const getVehiclesFail = ( error ) => {
    return {
        type: actionTypes.GET_VEHICLES_FAIL,
        error: error,
    };
};



export const getVehicles = (token, motorCarrierId) => (dispatch) => {
    dispatch(getVehiclesStart());
    const vehicleUrl = `https://e2e-eld-test.herokuapp.com/api/MotorCarriers/${motorCarrierId}/vehicles?access_token=${token}`;
    axios.get(vehicleUrl)
      .then((vehicleResponse) => {
        console.log(vehicleResponse);
        dispatch(getVehiclesSuccess(vehicleResponse.data));
      })
      .catch((err) => {
        console.log(err);
      });
    };


