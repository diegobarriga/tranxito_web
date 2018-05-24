export const arrayToObject = array =>
  array.reduce((obj, item) => {
    obj[item.id] = item;
    return obj;
  }, {});


export const arraySplit = (inputArray, chunks) => {
  const arr = inputArray.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunks);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
  return arr;
};
