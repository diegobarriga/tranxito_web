import * as actionTypes from './actionTypes';
import getVehiclesService from '../../services/trucks';


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



export const getVehicles = (token, motorCarrierId) => {
  return dispatch => {

      dispatch(getVehiclesStart());
      getVehiclesService(token, motorCarrierId)
      .then( (response) => {
        try{
          //const users = response.data.json()
          const vehicles = response;
          console.log(vehicles);
          dispatch(getVehiclesSuccess( vehicles ));
        }
        catch(error){
          dispatch(getVehiclesFail());
        }

        }
      )
    }
}
