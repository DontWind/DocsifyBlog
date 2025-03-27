/**
 * @param {number} n
 * @return {number}
 */
/* 尾递归 */
var climbStairs = function (n) {
  return calcNums(n, 1, 1);
};
function calcNums(n, a, b) {
  if (n <= 1) {
    return b;
  }
  return calcNums(n, b, a + b);
}

/* 非递归循环 */
var climbStairs = function (n) {
  if (n <= 1) {
    return 1;
  }
  let dpi = [];
  dpi[1] = 1;
  dpi[2] = 2;
  for (let i = 3; i <= n; i++) {
    dpi[i] = dpi[i - 1] + dpi[i - 2];
  }
  return dpi[n];
};
console.log(climbStairs(4));
