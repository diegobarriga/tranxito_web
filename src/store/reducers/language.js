import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
  spanishClicked: false,
  englishClicked: true,
};

const updateSidebarState = (state, action) => {
  if (action.language === 'english') {
    return updateObject(state, {
      englishClicked: action.clicked,
    });
  }
  return updateObject(state, {
    spanishClicked: action.clicked,
  });
};

const unmarkSidebar = (state) => { // eslint-disable-line
  return updateObject(state, {
    dashboardClicked: false,
    driversClicked: true,
    vehiclesClicked: false,
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
