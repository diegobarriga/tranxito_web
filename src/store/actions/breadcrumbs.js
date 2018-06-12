import * as actionTypes from './actionTypes';


export const resetBreadCrumbs = basePath => ({
  type: actionTypes.RESET_BREADCRUMBS,
  basePath,
});

export const addBreadCrumbs = lastCrumb => ({
  type: actionTypes.ADD_BREADCRUMBS,
  lastCrumb,
});

export const deleteCrumbs = () => ({
  type: actionTypes.DELETE_CRUMBS,
});

export const addNewBreadCrumb = (urlString, restart) => (dispatch) => {
  // Si hace click en la sidebar
  if (restart) {
    dispatch(resetBreadCrumbs(urlString));
  } else {
    dispatch(addBreadCrumbs(urlString));
  }
};
