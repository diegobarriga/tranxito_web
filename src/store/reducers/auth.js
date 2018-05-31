import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  role: null,
  motorCarrierId: null,
  vehicles: null,
  users: null,
  supervisors: {},
  image: null,
  first_name: null,
  last_name: null,
};

const authStart = state => updateObject(state, { error: null, loading: true });

const errorReset = state => updateObject(state, { error: null });

const createSuccess = (state, action) => {
  const newSupervisor = { ...state.supervisors };
  const newUser = action.response.data;
  newUser["account_status"] = true;
  newSupervisor[action.response.data.id] = newUser;
  return updateObject(state, {
    supervisors: newSupervisor,
    loading: false,
    error: action.response,
  });
};

const authLogout = (state) => {
  localStorage.clear();
  return updateObject(state, {
    token: null,
    userId: null,
    role: null,
    motorCarrierId: null,
    vehicles: null,
    users: null,
    supervisors: {},
    image: null,
    first_name: null,
    last_name: null,
    mcName: null,
  });
};

const createVehicle = (state, action) => {
  const newVehicles = { ...state.vehicles };
  newVehicles[action.vehicle.id] = action.vehicle;
  return updateObject(state, {
    vehicles: newVehicles,
  });
};

const createUser = (state, action) => {
  const newUsers = { ...state.users };
  newUsers[action.user.id] = action.user;
  return updateObject(state, {
    users: newUsers,
  });
};

const authSuccess = (state, action) => updateObject(state, {
  token: action.token,
  userId: action.userId,
  role: action.role,
  error: null,
  loading: false,
  motorCarrierId: action.motorCarrierId,
  vehicles: action.vehicles,
  users: action.users,
  chunkedUsers: action.chunkedUsers,
  chunkedVehicles: action.chunkedVehicles,
  supervisors: action.supervisors,
  image: action.image,
  first_name: action.first_name,
  last_name: action.last_name,
  mcName: action.mcName,

});

const authFail = (state, action) => updateObject(state, {
  error: action.error,
  loading: false,
});

/* Arreglar actualizar chunks */
const onDeleteUserSuccess = (state, action) => {
  const usersCpy = { ...state.users };
  delete usersCpy[action.userId];
  return updateObject(state, {
    error: action.response,
    loading: false,
    users: usersCpy,
  });
};

const onVehicleDeleteSuccess = (state, action) => {
  const tmpVehicles = { ...state.vehicles };
  delete tmpVehicles[action.vehicleId];
  return updateObject(state, {
    error: action.response,
    loading: false,
    vehicles: tmpVehicles,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state);
    case actionTypes.CREATE_SUCCESS: return createSuccess(state, action);
    case actionTypes.ERROR_RESET: return errorReset(state);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state);
    case actionTypes.USER_DELETE: return onDeleteUserSuccess(state, action);
    case actionTypes.DELETE_VEHICLE: return onVehicleDeleteSuccess(state, action);
    case actionTypes.CREATE_VEHICLE: return createVehicle(state, action);
    case actionTypes.CREATE_USER: return createUser(state, action);

    default:
      return state;
  }
};

export default reducer;
