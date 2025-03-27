/**
 * @param {number[]} nums
 * @return {number}
 */
/* 异或运算 */
//  var singleNumber = function(nums) {
//   let result=0
//   for(let i in nums){
//       result ^=nums[i]
//   }
//   return result
// };
var singleNumber = function(nums) {
  let set = new Set()
  for(let i in nums){
    if(set.has(nums[i])){
      set.remove(nums[i])
    }
  }
  return [...set][0]
};
singleNumber([1,1,2])