/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function (n) {
  let res = 0;
  while (n > 0) {
    res = res << 1;
    res |= n & 1;
    n = n >>> 1;
  }
  res = res >>> 0;
  console.log(res);
  return res;
};

reverseBits(4294967293);
