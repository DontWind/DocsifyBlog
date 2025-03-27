/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
/* 双指针 */
 var intersect = function(nums1, nums2) {
  nums1.sort((a,b)=>a-b)
  nums2.sort((a,b)=>a-b)
  let res=[]
  for(let i=0,j=0;i<nums1.length&&j<nums2.length;){
      if(nums1[i]===nums2[j]){
          res.push(nums1[i])
          i++
          j++
      }else if(nums1[i]>nums2[j]){
          j++
      }else{
          i++
      }
      console.log(nums1[i],nums2[j]);
  }
  return res
};
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
/* map对象 */
 var intersect = function(nums1, nums2) {
  let map1=new Map(),res=[]

  for(let i in nums1){
      if(map1.has(nums1[i])){
          map1.set(nums1[i],map1.get(nums1[i])+1)
      }else{
          map1.set(nums1[i],1)
      }
  }
  for(let i in nums2){
      if(map1.has(nums2[i])&&map1.get(nums2[i])>0){
          res.push(nums2[i])
           map1.set(nums2[i],map1.get(nums2[i])-1)
      }
  }
  return res
};