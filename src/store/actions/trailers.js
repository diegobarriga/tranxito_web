import * as actionTypes from './actionTypes';
import api from '../../services/api';

export const getTrailersStart = () => ({
  type: actionTypes.GET_TRAILERS_START,
});

export const getTrailersSuccess = trailers => ({
  type: actionTypes.GET_TRAILERS_SUCCESS,
  trailers,
});

export const getTrailersFail = error => ({
  type: actionTypes.GET_TRAILERS_FAIL,
  error,
});

export const onTrailerDeleteSuccess = (trailerId, response) => ({
  type: actionTypes.DELETE_TRAILER,
  trailerId,
  response,
});

export const delVErrorReset = () => ({
  type: actionTypes.DELV_ERROR_RESET,
});

export const onTrailerDelete = (trailerId, token) => (dispatch) => {
  console.log(trailerId);
  api.trailers.deleteTrailer(trailerId, token)
    .then((response) => {
      console.log(response);
      dispatch(onTrailerDeleteSuccess(trailerId, response));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getTrailers = (token, motorCarrierId) => (dispatch) => {
  dispatch(getTrailersStart());
  api.motorCarriers.getMotorCarrierTrailers(motorCarrierId, token)
    .then((trailerResponse) => {
      console.log(trailerResponse);
      dispatch(getTrailersSuccess(trailerResponse.data));
    })
    .catch((err) => {
      console.log(err);
    });
};
