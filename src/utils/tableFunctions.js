const moment = require('moment');

export function objToArr(stats) {
  const statsArray = [];
  Object.keys(stats).forEach((key) => {
    const obj = stats[key];
    obj.key = key;
    statsArray.push(obj);
  });
  // console.log(statsArray);
  return statsArray;
}

export function sortByColumnDown(column, stats) {
  stats.sort((a, b) => a[column] - b[column]);
  return stats;
}

export function sortByColumnUp(column, stats) {
  stats.sort((a, b) => b[column] - a[column]);
  return stats;
}

export function sortByColumnAZ(type, data, info) {
  return data.sort((a, b) => {
    if (type === 'Driver') {
      return info[a.key].lastName.localeCompare(info[b.key].lastName);
    }
    return info[a.key].carMaker.localeCompare(info[b.key].carMaker);
  });
}

export function sortByColumnZA(type, data, info) {
  return data.sort((a, b) => {
    if (type === 'Driver') {
      return info[b.key].lastName.localeCompare(info[a.key].lastName);
    }
    return info[b.key].carMaker.localeCompare(info[a.key].carMaker);
  });
}

export function formatDate(datetime) {
  return moment(datetime).format('MMMM Do YYYY, h:mm a');
}

export function sortByTimestampDown(logs) {
  logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  return logs;
}

export function sortByTimestampUp(logs) {
  logs.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  return logs;
}

export function filterByEvent(logs, event) {
  let filteredLogs;
  if (String(event.target.value) === String(-1)) {
    filteredLogs = logs;
  } else {
    filteredLogs = logs.filter(log => ((
      String(log.type) === String(event.target.value)
    )));
  }

  return filteredLogs;
}
