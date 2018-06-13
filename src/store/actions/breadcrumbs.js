import * as actionTypes from './actionTypes';


export const resetBreadCrumbs = (basePath, url) => ({
  type: actionTypes.RESET_BREADCRUMBS,
  basePath,
  url,
});

export const addBreadCrumbs = (lastCrumb, links) => ({
  type: actionTypes.ADD_BREADCRUMBS,
  lastCrumb,
  links,
});

export const deleteCrumbs = () => ({
  type: actionTypes.DELETE_CRUMBS,
});

export const addNewBreadCrumb = (urlString, restart, url) => (dispatch) => {
  // Si hace click en la sidebar
  if (restart) {
    dispatch(resetBreadCrumbs(urlString, url));
  } else {
    dispatch(addBreadCrumbs(urlString, url));
  }
};
