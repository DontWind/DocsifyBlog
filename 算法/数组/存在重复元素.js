/**
 * @param {number[]} nums
 * @return {boolean}
 */
 var containsDuplicate = function(nums) {
  let obj={}
  for(let i=0;i<nums.length;i++){
      if(obj[nums[i]]){
          return true
      }
      obj[nums[i]]=1
  }
  return false
};

function cD(nums){
  return !(nums.length===[...new Set(nums)].length)
}
console.log(cD([1,1,2,3]));