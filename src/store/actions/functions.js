export const arrayToObject = array => // eslint-disable-line
  array.reduce((obj, item) => { // eslint-disable-line
    obj[item.id] = item; // eslint-disable-line
    return obj; // eslint-disable-line
  }, {}); // eslint-disable-line
