/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function (n) {
  if (n == 1) {
    return '1';
  }
  n--;
  return count('1', n);
};

function count(str, n) {
  n--;
  let num = str.split('');
  let res = '';
  let index = 0;
  for (let i = 0; i < num.length - 1; i++) {
    if (num[i] !== num[i + 1]) {
      index++;
      res += index + '' + num[i];
      index = 0;
    } else {
      index++;
    }
  }
  if (num[num.length - 1] === num[num.length - 2]) {
    index++;
    res += index + '' + num[num.length - 1];
  } else {
    res += 1 + '' + num[num.length - 1];
  }
  console.log(res, n);
  if (n > 0) {
    return count(res, n);
  }
  return res;
}
countAndSay(10);
