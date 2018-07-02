import * as actionTypes from './actionTypes';
import api from '../../services/api';

export const getTrailerStart = () => ({
  type: actionTypes.GET_TAILER_START,
});

export const getTrailerSuccess = trailer => ({
  type: actionTypes.GET_TRAILER_SUCCESS,
  trailer,
});

export const getTrailerFail = error => ({
  type: actionTypes.GET_TRAILER_FAIL,
  error,
});

export const createTrailer = trailer => ({
  type: actionTypes.CREATE_TRAILER,
  trailer,
});

export const getTrailer = (token, trailerId) => (dispatch) => {
  dispatch(getTrailerStart());
  api.trailers.getTrailer(trailerId, token)
    .then((response) => {
      console.log(response);
      console.log('get trailer response');
      try {
        const trailer = response.data;
        dispatch(getTrailerSuccess(trailer));
      } catch (error) {
        dispatch(getTrailerFail());
      }
    });
};
