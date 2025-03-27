/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function (n) {
  let count = 0;
  for (let i = 0; i < 32; i++) {
    console.log(n >>> i, (n >>> i) & 1);
    if (((n >>> i) & 1) == 1) {
      count++;
    }
  }
  return count;
};

hammingWeight(11);
