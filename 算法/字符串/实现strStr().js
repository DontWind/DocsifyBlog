/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
/* 逐个判断 */
var strStr = function (haystack, needle) {
  if (haystack === needle || needle === '') {
    return 0;
  }
  let h = haystack.split(''),
    n = needle.split(''),
    j = 0,
    i = 0;
  for (; i < h.length && j < n.length; ) {
    if (h[i] === n[j]) {
      i++;
      j++;
    } else {
      i = i - j + 1;
      j = 0;
    }
  }
  if (j == n.length) {
    return i - j;
  }
  return -1;
};
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
/* 不断截取主字符串进行比较 */
var strStr = function (haystack, needle) {
  if (haystack === needle || needle === '') {
    return 0;
  }
  let len = needle.length;
  for (let i = 0; i < haystack.length - len + 1; i++) {
    if (haystack.substring(i, i + len) === needle) {
      return i;
    }
  }
  return -1;
};
