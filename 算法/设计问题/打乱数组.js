/**
 * @param {number[]} nums
 */
var Solution = function (nums) {
  this.nums = nums;
};

/**
 * Resets the array to its original configuration and return it.
 * @return {number[]}
 */
Solution.prototype.reset = function () {
  return this.nums;
};

/**
 * Returns a random shuffling of the array.
 * @return {number[]}
 */
Solution.prototype.shuffle = function () {
  let nums = Object.assign([], this.nums),
    len = this.nums.length;
  for (let i = 1; i < len; i++) {
    let a1 = Math.floor(Math.random() * len);
    let temp = nums[a1];
    nums[a1] = nums[len - 1];
    nums[len - 1] = temp;
  }
  return nums;
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.reset()
 * var param_2 = obj.shuffle()
 */
