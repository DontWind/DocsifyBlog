/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    let m = n >> 1,
      left = 0,
      right = n;
    while (left < right) {
      m = parseInt((left + right) / 2);
      if (!isBadVersion(m)) {
        left = m + 1;
      } else {
        right = m;
      }
    }
    return left;
  };
};
