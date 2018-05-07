import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  motorCarriers: [],
  loading: false,
  error: null,
};

const createMCarrierStart = (state, action) => updateObject(state, { error: null, loading: true });


const createMCSuccess = (state, action) => {
  const otherCarriers = state.motorCarriers;
  const newCarrier = action.regData;

  return updateObject(state, {
    loading: false,
    motorCarriers: [newCarrier, ...otherCarriers],
  });
};

const setMotorCarriers = (state, action) => updateObject(state, {
  motorCarriers: action.motorCarriers,
});


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MOTORCARRIER: return setMotorCarriers(state, action);
    case actionTypes.START_MCCREATE: return createMCarrierStart(state, action);
    case actionTypes.CREATEMC_SUCCESS: return createMCSuccess(state, action);

    default:
      return state;
  }
};


export default reducer;
