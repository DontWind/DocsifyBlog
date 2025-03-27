function start(str) {
  let num = str.split('');
  if (num.length <= 0 || num.length > 10) {
    return 0;
  }
  for (let i in num) {
    if (num[i] >= 'A' && num[i] <= 'z') {
      continue;
    }
    return 0;
  }
  return 1;
}
let arr = ['BA', 'aOWVXARgUbJDG', 'OPPCSKNS', 'HFDJEEDA', 'ABBABBBBAABBBAABAAA'];
let ret = 0;
while (arr.length > 0) {
  ret += start(arr.pop());
}
console.log(ret);
