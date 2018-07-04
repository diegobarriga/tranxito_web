import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  role: null,
  motorCarrierId: null,
  trailers: null,
  vehicles: null,
  users: null,
  image: null,
  firstName: null,
  lastName: null,
  email: null,
  driverLicenseNumber: null,
  lastMod: {},
};

const authStart = state => updateObject(state, { error: null, loading: true });

const updateUsersStart = state => updateObject(state, { error: null, loading: true });

const updateVehiclesStart = state => updateObject(state, { error: null, loading: true });

const errorReset = state => updateObject(state, { error: null });

// const createSuccess = (state, action) => {
//   const newSupervisor = { ...state.supervisors };
//   const newUser = action.response.data;
//   newUser.accountStatus = true;
//   newSupervisor[action.response.data.id] = newUser;
//   return updateObject(state, {
//     supervisors: newSupervisor,
//     loading: false,
//     error: action.response,
//   });
// };

const authLogout = (state) => {
  localStorage.clear();
  return updateObject(state, {
    token: null,
    userId: null,
    role: null,
    motorCarrierId: null,
    trailers: null,
    vehicles: null,
    users: null,
    image: null,
    firstName: null,
    lastName: null,
    mcName: null,
    lastMod: {},
    email: null,
    driverLicenseNumber: null,
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

const updateUsersSuccess = (state, action) => updateObject(state, {
  users: action.users,
  loading: false,
});

const updateVehiclesSuccess = (state, action) => updateObject(state, {
  vehicles: action.vehicles,
  loading: false,
});


const updateLastMod = (state, action) => {
  console.log('entro a updateLastMod ---', action);
  return updateObject(state, {
    lastMod: action.response,
  });
};

const createTrailer = (state, action) => {
  const newTrailers = { ...state.trailers };
  newTrailers[action.trailer.id] = action.trailer;
  return updateObject(state, {
    trailers: newTrailers,
  });
};

const authSuccess = (state, action) => updateObject(state, {
  token: action.token,
  userId: action.userId,
  role: action.role,
  error: null,
  loading: false,
  motorCarrierId: action.motorCarrierId,
  trailers: action.trailers,
  vehicles: action.vehicles,
  users: action.users,
  chunkedUsers: action.chunkedUsers,
  chunkedVehicles: action.chunkedVehicles,
  image: action.image,
  firstName: action.firstName,
  lastName: action.lastName,
  mcName: action.mcName,
  lastMod: action.lastMod,
  email: action.email,
  driverLicenseNumber: action.driverLicenseNumber,
});

const authFail = (state, action) => updateObject(state, {
  error: action.error,
  loading: false,
});

const updateUsersFail = (state, action) => updateObject(state, {
  error: action.error,
  loading: false,
});

const updateVehiclesFail = (state, action) => updateObject(state, {
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

const onTrailerDeleteSuccess = (state, action) => {
  const tmpTrailers = { ...state.trailers };
  delete tmpTrailers[action.trailerId];
  return updateObject(state, {
    error: action.response,
    loading: false,
    trailers: tmpTrailers,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state);
    // case actionTypes.CREATE_SUCCESS: return createSuccess(state, action);
    case actionTypes.ERROR_RESET: return errorReset(state);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state);
    case actionTypes.USER_DELETE: return onDeleteUserSuccess(state, action);
    case actionTypes.DELETE_VEHICLE: return onVehicleDeleteSuccess(state, action);
    case actionTypes.CREATE_VEHICLE: return createVehicle(state, action);
    case actionTypes.CREATE_TRAILER: return createTrailer(state, action);
    case actionTypes.DELETE_TRAILER: return onTrailerDeleteSuccess(state, action);
    case actionTypes.CREATE_USER: return createUser(state, action);
    case actionTypes.UPDATE_LASTMOD: return updateLastMod(state, action);
    case actionTypes.UPDATE_USERS_START: return updateUsersStart(state);
    case actionTypes.UPDATE_USERS_SUCCESS: return updateUsersSuccess(state, action);
    case actionTypes.UPDATE_USERS_FAIL: return updateUsersFail(state, action);
    case actionTypes.UPDATE_VEHICLES_START: return updateVehiclesStart(state);
    case actionTypes.UPDATE_VEHICLES_SUCCESS: return updateVehiclesSuccess(state, action);
    case actionTypes.UPDATE_VEHICLES_FAIL: return updateVehiclesFail(state, action);

    default:
      return state;
  }
};

export default reducer;
