import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
  users: {},
  loading: false,
  error: null,
};

const getUsersFail = (state, action) => updateObject(state, {
  error: action.error,
  loading: false,
});

const getUsersSuccess = (state, action) => updateObject(state, {
  users: action.users,
  loading: false,
});

const delErrorReset = state => updateObject(state, { error: null });

/* borrar driver de la store */
const onDeleteSuccess = (state, action) => {
  const oldUser = state.users.find(user => user.id === action.userId);
  const otherUsers = state.users.filter(user => user.id !== action.userId);
  const newUser = Object.assign({}, oldUser, {
    account_status: false,
  });

  return updateObject(state, {
    error: action.response,
    loading: false,
    users: [newUser, ...otherUsers],
  });
};


const getUsersStart = state => updateObject(state, { error: null, loading: true });


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USERS_START: return getUsersStart(state);
    case actionTypes.GET_USERS_SUCCESS: return getUsersSuccess(state, action);
    case actionTypes.GET_USERS_FAIL: return getUsersFail(state, action);
    case actionTypes.DELETE_USER: return onDeleteSuccess(state, action);
    case actionTypes.DEL_ERROR_RESET: return delErrorReset(state);

    default:
      return state;
  }
};

export default reducer;
