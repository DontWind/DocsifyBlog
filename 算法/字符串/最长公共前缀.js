/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  let res = strs[0];
  let local = strs[0];

  for (let i = 0; i < strs.length; i++) {
    let ret = '';
    for (let j = 0; j < local.length; j++) {
      if (strs[i][j] == local[j]) {
        ret += local[j];
      } else {
        break;
      }
    }
    if (ret.length < res.length) {
      res = ret;
    }
  }
  return res;
};
