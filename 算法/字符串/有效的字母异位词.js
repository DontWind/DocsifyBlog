/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) {
    return false;
  }
  let mapS = new Map(),
    mapT = new Map();
  for (let i in s) {
    if (mapS.has(s[i])) {
      mapS.set(s[i], mapS.get(s[i]) + 1);
    } else {
      mapS.set(s[i], 1);
    }
    if (mapT.has(t[i])) {
      mapT.set(t[i], mapT.get(t[i]) + 1);
    } else {
      mapT.set(t[i], 1);
    }
  }
  for (let i of mapS.keys()) {
    if (mapS.get(i) !== mapT.get(i)) {
      return false;
    }
  }

  return true;
};
isAnagram('abb', 'aba');
