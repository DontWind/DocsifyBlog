/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
/* 添加k位 */
var rotate = function (nums, k) {
  for (let i = 0; i < k; i++) {
    nums.push(0)
  }
  for (let i = nums.length - 1; i - k >= 0; --i) {
    nums[i] = nums[i - k]
  }
  for (let i = k - 1; i >= 0; i--) {
    nums[i] = nums.pop()
  }
};
/* 反转 */
function rotate(nums,k) {
  let length = nums.length;
  k %= length;
  reverse(nums, 0, length - 1);//先反转全部的元素
  reverse(nums, 0, k - 1);//在反转前k个元素
  reverse(nums, k, length - 1);//接着反转剩余的
}


function reverse(nums, start, end) {
  while (start < end) {
    let temp = nums[start];
    nums[start++] = nums[end];
    nums[end--] = temp;
  }
}