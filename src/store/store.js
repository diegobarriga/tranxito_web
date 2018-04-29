import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import authReducer from './reducers/auth';
import mcarrierReducer from './reducers/mcarrier';
import usersReducer from './reducers/users';
import vehiclesReducer from './reducers/vehicles';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  mcarrier: mcarrierReducer,
  users: usersReducer,
  vehicles: vehiclesReducer,
});


const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    console.log(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer, persistedState, composeEnhancers(applyMiddleware(thunk)));


store.subscribe(() => saveToLocalStorage({ auth: store.getState().auth }));


export default store;
