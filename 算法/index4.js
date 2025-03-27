/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  let res = '';
  for (let i = 0; i < s.length; i++) {
    let s1 = isPalindrome(s, i, i);
    let s2 = isPalindrome(s, i, i + 1);
    res = res.length > s1.length ? res : s1;
    res = res.length > s2.length ? res : s2;
    console.log(s1, s2, res);
  }
  return res;
};

function isPalindrome(s, l, r) {
  while (l >= 0 && r < s.length && s[l] == s[r]) {
    l--;
    r++;
  }
  return s.slice(l, r);
}

console.log(longestPalindrome('babad'));
