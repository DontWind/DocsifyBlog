const num = 4;
function start(str) {
  let arr = str.split(' ');
  for (let i in arr) {
    arr[i] = parseInt(arr[i]);
  }
  let res = arr[arr.length - 1];
  if (arr[2] >= arr[0]) {
    res += arr[0];
    arr[0] = arr[2] - arr[0];
  } else {
    res += arr[2];
    arr[2] = arr[0] = arr[2];
  }
  let temp = arr[1] % 2;
  res += Math.floor(arr[1] / 2);
  if (temp > 0 && arr[0] >= 2) {
    res += 1;
    arr[0] -= 2;
  }
  res += Math.floor(arr[0] / 4);
  return res;
}
console.log(start('10 0 4 0'));
