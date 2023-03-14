const removeEmpty = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object') {
      removeEmpty(obj[key]);
    } else if (obj[key] === '') {
      // eslint-disable-next-line no-param-reassign
      delete obj[key];
    }
  });
  return obj;
};

/**
 * @description
 * Takes an Array<V>, and a grouping function,
 * and returns a Map of the array grouped by the grouping function.
 *
 * @param list An array of type V.
 * @param keyGetter A Function that takes the Array type V as an input, and returns a value of type K.
 *                  K is generally intended to be a property key of V.
 *
 * @returns Map of the array grouped by the grouping function.
 */
function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

function sortBy(list, sortByKey, sortOrder = true) {
  return list.sort((p1, p2) => {
    if (sortOrder) {
      // eslint-disable-next-line no-nested-ternary
      return p1[sortByKey] > p2[sortByKey] ? 1 : p1[sortByKey] < p2[sortByKey] ? -1 : 0;
    }
    // eslint-disable-next-line no-nested-ternary
    return p1[sortByKey] < p2[sortByKey] ? 1 : p1[sortByKey] > p2[sortByKey] ? -1 : 0;
  });
}

module.exports = { removeEmpty, groupBy, sortBy };
