/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
  let json = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000,
    },
    len = s.length;
  let res = 0;
  for (let i = 0; i < len; i++) {
    let num1 = json[s[i]],
      num2 = json[s[i + 1]];
    console.log(num1, num2);
    if (num2 && num1 < num2) {
      res -= num1;
    } else {
      res += num1;
    }
  }
  return res;
};
console.log(romanToInt('III'));
