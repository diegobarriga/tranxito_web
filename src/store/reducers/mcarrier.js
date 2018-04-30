import * as actionTypes from '../actions/actionTypes';

const initialState = {
  motorCarriers: [],
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MOTORCARRIER:
      return {
        ...state,
        motorCarriers: action.motorCarriers,
      };

    default:
      return state;
  }
};


export default reducer;
