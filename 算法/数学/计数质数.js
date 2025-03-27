/**
 * @param {number} n
 * @return {number}
 */
var countPrimes = function (n) {
  let arr = new Array(n).fill(1),
    count = 0;
  for (let i = 2; i <= n; i++) {
    if (arr[i]) {
      count++;
    }
    for (let j = i * 2; j <= n; j += i) {
      arr[j] = 0;
    }
  }
  return count;
};
