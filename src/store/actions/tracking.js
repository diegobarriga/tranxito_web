import * as actionTypes from './actionTypes';
import api from '../../services/api';

export const getTrackingInfoStart = () => ({
  type: actionTypes.GET_TRACKING_INFO_START,
});

export const getTrackingInfoSuccess = trackings => ({
  type: actionTypes.GET_TRACKING_INFO_SUCCESS,
  trackings,
});

export const getTrackingInfoFail = error => ({
  type: actionTypes.GET_TRACKING_INFO_FAIL,
  error,
});

export const getTrackings = (token, motorCarrierId) => (dispatch) => {
  dispatch(getTrackingInfoStart());
  api.motorCarriers.getTrackingsMotorCarrier(motorCarrierId, token)
    .then((trackingResponse) => {
      console.log(trackingResponse);
      dispatch(getTrackingInfoSuccess(trackingResponse.data.data));
    })
    .catch((err) => {
      console.log(err);
    });
};
