import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
  motorCarriers: [],
  loading: false,
  error: null,
};

const createMCarrierStart = state => updateObject(state, { error: null, loading: true });

const createMCFail = (state, action) => updateObject(state, {
  error: action.error,
  loading: false,
});

const createMCSuccess = (state, action) => {
  const otherCarriers = state.motorCarriers;
  const newCarrier = action.regData;

  return updateObject(state, {
    loading: false,
    error: action.response,
    motorCarriers: [newCarrier, ...otherCarriers],
  });
};

const setMotorCarriers = (state, action) => updateObject(state, {
  motorCarriers: action.motorCarriers,
});


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MOTORCARRIER: return setMotorCarriers(state, action);
    case actionTypes.START_MCCREATE: return createMCarrierStart(state);
    case actionTypes.CREATEMC_SUCCESS: return createMCSuccess(state, action);
    case actionTypes.MCARRIER_CREATE_FAIL: return createMCFail(state, action);

    default:
      return state;
  }
};


export default reducer;
