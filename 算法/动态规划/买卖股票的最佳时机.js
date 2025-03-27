/**
 * @param {number[]} prices
 * @return {number}
 */
/* 动态规划 */
var maxProfit = function (prices) {
  if (prices == null || prices.length == 0) return 0;
  let sold = 0,
    buy = -prices[0];
  for (let i in prices) {
    sold = Math.max(sold, buy + prices[i]);
    buy = Math.max(buy, -prices[i]);
  }
  return sold;
};
/**
 * @param {number[]} prices
 * @return {number}
 */
/* 双指针 */
var maxProfit = function (prices) {
  if (prices == null || prices.length == 0) return 0;
  let min = prices[0],
    max = 0;
  for (let i in prices) {
    min = Math.min(min, prices[i]);
    max = Math.max(max, prices[i] - min);
  }
  return max;
};
/**
 * @param {number[]} prices
 * @return {number}
 */
/* 最大子序和 */
var maxProfit = function (prices) {
  if (prices == null || prices.length == 0) return 0;
  let cur = 0,
    max = 0;
  for (let i = 1; i < prices.length; i++) {
    cur = Math.max(cur, 0) + prices[i] - prices[i - 1];
    max = Math.max(max, cur);
  }
  return max;
};
