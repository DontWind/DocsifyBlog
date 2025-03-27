/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 var twoSum = function(nums, target) {
  let map = new Map()
  for(let i in nums){
      if(map.get(target-nums[i])){
          return [map.get(target-nums[i]),i]
      }
      map.set(nums[i],i)
  }
  return []
};