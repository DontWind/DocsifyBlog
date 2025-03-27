/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  let arr = s.toLowerCase().split(''),
    i = 0,
    j = arr.length - 1;
  let Regx = /^[A-Za-z0-9]*$/;
  for (; i < arr.length && j >= 0; ) {
    if (!Regx.test(arr[i])) {
      i++;
      continue;
    }
    if (!Regx.test(arr[j])) {
      j--;
      continue;
    }
    if (arr[i] !== arr[j]) {
      return false;
    }
    i++;
    j--;
  }
  return true;
};

console.log(isPalindrome('0P'));
