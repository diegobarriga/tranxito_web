import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
  breadcrumbs: [],
  links: [],
};

const resetBreadCrumbs = (state, action) => {
  const newArr = [];
  const newLinks = [];
  newArr.push(action.basePath);
  newLinks.push(action.url);
  return updateObject(state, {
    breadcrumbs: newArr,
    links: newLinks,
  });
};

const addBreadCrumbs = (state, action) => {
  let noItemInArray = true;
  const newArr = [...state.breadcrumbs];
  const newLinkArr = [...state.links];
  newArr.forEach((url) => {
    if (url === action.lastCrumb) {
      noItemInArray = false;
    }
  });

  if (noItemInArray) {
    newArr.push(action.lastCrumb);
    newLinkArr.push(action.links);
  }
  return updateObject(state, {
    breadcrumbs: newArr,
    links: newLinkArr,
  });
};

const deleteCrumbs = (state) => { // eslint-disable-line
  return updateObject(state, {
    breadcrumbs: [],
    links: [],
  });
};

const popCrumb = (state) => { // eslint-disable-line
  const newCrumbs = [...state.breadcrumbs];
  newCrumbs.pop();
  const newLinks = [...state.links];
  newLinks.pop();
  return updateObject(state, {
    breadcrumbs: newCrumbs,
    links: newLinks,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESET_BREADCRUMBS: return resetBreadCrumbs(state, action);
    case actionTypes.ADD_BREADCRUMBS: return addBreadCrumbs(state, action);
    case actionTypes.DELETE_CRUMBS: return deleteCrumbs(state, action);
    case actionTypes.POP_CRUMB: return popCrumb(state, action);

    default:
      return state;
  }
};


export default reducer;
