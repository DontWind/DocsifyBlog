/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
  let arr = s.split(''),
    map = new Map();
  for (let i in arr) {
    if (map.has(arr[i])) {
      map.set(arr[i], 2);
      continue;
    }
    map.set(arr[i], 1);
  }
  for (let i of map.keys()) {
    if (map.get(i) < 2) {
      return arr.indexOf(i);
    }
  }
  return -1;
};
firstUniqChar('loveleetcode');
