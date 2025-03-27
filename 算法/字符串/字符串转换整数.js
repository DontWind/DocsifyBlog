/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  let RegNum = /^[0-9]*$/,
    RegCode = /^[A-Za-z]*$/;
  let res = '',
    arr = s.split(''),
    flag = false;
  for (let i in arr) {
    if (arr[i] === '-' || arr[i] === '+' || arr[i] === '.') {
      flag = true;
      res += arr[i];
    }
    if (RegCode.test(arr[i]) || (arr[i] === ' ' && flag)) {
      break;
    }
    if (RegNum.test(arr[i])) {
      flag = true;
      res += arr[i];
    }
  }
  return !parseInt(res)
    ? 0
    : parseInt(res) >= Math.pow(2, 31)
    ? Math.pow(2, 31) - 1
    : parseInt(res) < -Math.pow(2, 31)
    ? -Math.pow(2, 31)
    : parseInt(res);
};
