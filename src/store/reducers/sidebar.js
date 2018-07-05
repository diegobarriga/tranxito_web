import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
  dashboardClicked: false,
  driversClicked: true,
  vehiclesClicked: false,
  devicesClicked: false,
  trailersClicked: false,
  supervisorsClicked: false,
};

const updateSidebarState = (state, action) => {
  if (action.tabName === 'dashboard') {
    return updateObject(state, {
      dashboardClicked: action.clicked,
    });
  } else if (action.tabName === 'drivers') {
    return updateObject(state, {
      driversClicked: action.clicked,
    });
  } else if (action.tabName === 'devices') {
    return updateObject(state, {
      devicesClicked: action.clicked,
    });
  } else if (action.tabName === 'vehicles') {
    return updateObject(state, {
      vehiclesClicked: action.clicked,
    });
  } else if (action.tabName === 'trailers') {
    return updateObject(state, {
      trailersClicked: action.clicked,
    });
  }
  // Supervisor
  return updateObject(state, {
    supervisorsClicked: action.clicked,
  });
};

const unmarkSidebar = (state) => { // eslint-disable-line
  return updateObject(state, {
    dashboardClicked: false,
    driversClicked: true,
    vehiclesClicked: false,
    devicesClicked: false,
    trailersClicked: false,
    supervisorsClicked: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_SIDEBAR: return updateSidebarState(state, action);
    case actionTypes.UNMARK_SIDEBAR: return unmarkSidebar(state, action);

    default:
      return state;
  }
};


export default reducer;
