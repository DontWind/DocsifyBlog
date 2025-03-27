/**
 * @param {number[]} prices
 * @return {number}
 */
/* 动态规划 */
/*      1    2    3    4    5   4   3   2   1 */
/* sold 0    1    2    3    4   4   4   4   4 */
/* buy  -1   -1   -1   -1   -1  0   1   2   3 */
var maxProfit = function (prices) {
  if (prices == null || prices.length < 2)
    return 0;
  let len = prices.length;
  let buy = -prices[0],
    sold = 0
  for (let i = 1; i < len; i++) {
    sold = Math.max(sold, buy + prices[i])
    buy = Math.max(buy, sold - prices[i])
  }
  return sold
};

/* 贪心算法 */
var maxProfitT = function (prices) {
  let sum = 0
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      sum += prices[i] - prices[i - 1]
    }
  }
  return sum
}