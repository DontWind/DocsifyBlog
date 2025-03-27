/**
 * @param {number[]} digits
 * @return {number[]}
 */
 var plusOne = function(digits) {
  return addOne(digits,digits.length-1)
};

function addOne(digits,index){
  if(index<0){
      index+=1
      digits.unshift(0)
  }
  if((digits[index]+1)===10){
      digits[index]=0
      addOne(digits,index-1)
  }else{
      digits[index]+=1
  }

  return digits
}