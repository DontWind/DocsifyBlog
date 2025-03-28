/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  let res = 0;
  while (x != 0) {
    res = res * 10 + (x % 10);
    x = parseInt(x / 10);
    if (Math.abs(res) > Math.pow(2, 31)) {
      return 0;
    }
  }
  return res;
};
