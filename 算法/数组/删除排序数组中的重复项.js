/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  if(nums===null||nums.length===0){
      return []
  }
  let left=0,right=1;
  while(right<nums.length){
      if(nums[left]===nums[right]){
          right++
      }else{
          left++
          nums[left]=nums[right]
          right++
      }
      console.log(nums,left,right);
  }
  nums.splice(++left)
  return nums
};
console.log(removeDuplicates([1,1,2]));
