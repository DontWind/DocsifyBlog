/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (!nums || nums.length === 0) {
    return 0;
  }
  let dp0 = 0,
    dp1 = nums[0],
    len = nums.length;
  for (let i = 1; i < len; i++) {
    let temp = Math.max(dp0, dp1);
    dp1 = dp0 + nums[i];
    dp0 = temp;
  }
  return Math.max(dp0, dp1);
};
