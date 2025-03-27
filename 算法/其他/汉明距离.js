/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function (x, y) {
  let n = x ^ y,
    count = 0;
  while (n > 0) {
    count += n & 1;
    n = n >> 1;
  }
  return count;
};
