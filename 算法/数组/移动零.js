/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
/* 双重循环 */
 var moveZeroes = function (nums) {

  for (let i = nums.length - 1; i >= 0;i--) {
      if (nums[i] === 0) {
          for (let j = i; j < nums.length - 1;j++) {
              [nums[j],nums[j+1]]=[nums[j+1],nums[j]]
              console.log([nums[j],nums[j+1]]);
              console.log([j]);
          }
      }
      console.log(nums);
  }
};
/* 移动非零 */
var moveZeroes = function (nums) {
  let index=0
  for (let i in nums) {
    if(nums[i]!==0){
      nums[index++]=nums[i]
    }
  }
  while(index<nums.length){
    nums[index++]=0
  }
};
// 双指针
var moveZeroes = function (nums) {
  let index=0
  for (let i in nums) {
    if(nums[j]===0){
      index++
    }else if(i!=0){
      [nums[j-i],nums[j]]=[nums[j],nums[j-i]]
    }
  }
  
};
moveZeroes([0,1,0,3,12])