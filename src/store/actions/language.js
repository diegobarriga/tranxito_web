import * as actionTypes from './actionTypes';

const updateLanguage = (language, clicked) => ({
  type: actionTypes.UPDATE_LANGUAGE,
  language,
  clicked,
});

export { updateLanguage as default };
