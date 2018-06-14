import * as actionTypes from './actionTypes';

export const unmarkSidebar = () => ({
  type: actionTypes.UNMARK_SIDEBAR,
});

export const updateSidebarState = (tabName, clicked) => ({
  type: actionTypes.UPDATE_SIDEBAR,
  tabName,
  clicked,
});
