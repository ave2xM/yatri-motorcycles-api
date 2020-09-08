export function arrayToObj(array) {
  return array.reduce((obj, item) => {
    obj[item._id] = item;
    return obj;
  }, {});
}
