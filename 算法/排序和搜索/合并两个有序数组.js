/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  let i = m - 1,
    j = n - 1,
    len = nums1.length - 1;
  while (i >= 0 && j >= 0) {
    if (nums1[i] >= nums2[j]) {
      nums1[len] = nums1[i];
      len--;
      i--;
    } else {
      nums1[len] = nums2[j];
      len--;
      j--;
    }
    console.log(nums1);
  }

  while (j >= 0) {
    nums1[len] = nums2[j];
    j--;
    len--;
    console.log(nums1);
  }
};
merge([0], 0, [1], 1);
