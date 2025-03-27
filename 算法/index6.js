const arr = ['A', 'H', 'I', 'M', 'T', 'U', 'V', 'W', 'X', 'Y', 'O'];
function start(a) {
  let num = a.split('');
  let j = num.length - 1,
    str = '';
  while (j >= 0) {
    if (arr.indexOf(num[j]) !== -1) {
      str += num[j];
      j--;
      continue;
    }
    return 'NO';
  }
  console.log(str, a);
  if (str === a) {
    return 'YES';
  }
  return 'NO';
}

console.log(start('AHA'));
