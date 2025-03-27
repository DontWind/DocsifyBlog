function start(str) {
  let stack = [],
    temp = '';
  let arr = str.split('<');
  arr.shift();
  for (let i in arr) {
    if (arr[i].indexOf(' ') !== -1) {
      arr[i] = arr[i].split(' ')[0] + '>';
    }
    stack.push(arr[i]);
  }
  while (stack.length) {
    let left = stack.shift(),
      right = stack.pop();

    if ('/' + left === right) {
      continue;
    }
    return false;
  }
  return true;
}
console.log(start("<div class='class1'><p></p></div>"));
// let arr = htmlText.split('<'),
//     left = [],
//     right = [];
//   arr.shift();
//   for (let i in arr) {
//     if (arr[i].indexOf(' ') !== -1) {
//       arr[i] = arr[i].split(' ')[0] + '>';
//     }
//     if (arr[i].indexOf('/') !== -1) {
//       right.push(arr[i]);
//     } else {
//       left.push(arr[i]);
//     }
//   }
//   while (left.length > 0 && right.length > 0) {
//     if ('/' + left.pop() === right.pop()) {
//       continue;
//     }
//     return false;
//   }
//   if (left.length > 0 || right.length > 0) {
//     return false;
//   }
//   return true;
