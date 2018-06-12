import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
  breadcrumbs: [],
};

const resetBreadCrumbs = (state, action) => {
  const newArr = [];
  newArr.push(action.basePath);
  return updateObject(state, {
    breadcrumbs: newArr,
  });
};

const addBreadCrumbs = (state, action) => {
  let noItemInArray = true;
  const newArr = [...state.breadcrumbs];
  newArr.forEach((url) => {
    if (url === action.lastCrumb) {
      noItemInArray = false;
    }
  });

  if (noItemInArray) {
    newArr.push(action.lastCrumb);
  }
  return updateObject(state, {
    breadcrumbs: newArr,
  });
};

const deleteCrumbs = (state) => { // eslint-disable-line
  return updateObject(state, {
    breadcrumbs: [],
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESET_BREADCRUMBS: return resetBreadCrumbs(state, action);
    case actionTypes.ADD_BREADCRUMBS: return addBreadCrumbs(state, action);
    case actionTypes.DELETE_CRUMBS: return deleteCrumbs(state, action);

    default:
      return state;
  }
};


export default reducer;
