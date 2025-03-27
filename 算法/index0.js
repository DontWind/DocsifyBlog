function start(exp) {
  if (exp.length <= 1) {
    return exp;
  }
  let arr = exp.split(''),
    flag = false,
    control = ['-', '+', '*', '/'];
  let stack = [''],
    j = 0;
  for (let i = 0; i < arr.length; i++) {
    if (control.includes(arr[i])) {
      if (flag) {
        return 'Synatx Error';
      } else {
        flag = true;
        j++;
        stack[j] = arr[i];
        j++;
        stack[j] = '';
      }
    } else {
      flag = false;
      stack[j] += arr[i];
    }
  }

  while (stack.length >= 3) {
    let index = stack.indexOf('*') === -1 ? stack.indexOf('/') : stack.indexOf('*');
    if (index !== -1) {
      let temp = eval(stack[index - 1] + stack[index] + stack[index + 1]);
      stack.splice(index - 1, 2);
      stack[index - 1] = temp;
    } else {
      let temp = eval(stack[0] + stack[1] + stack[2]);
      stack.splice(0, 2);
      stack[0] = temp;
    }
  }
  return stack[0];
}

function bigNumAdd(a, b) {
  a = '0' + a;
  b = '0' + b;
  let aArr = a.split(''),
    bArr = b.split('');
  let carry = 0,
    res = [];
  let len = Math.max(aArr.length, bArr.length);
  let lenNum = aArr.length - bArr.length;
  if (lenNum > 0) {
    for (let i = 0; i > lenNum; i++) {
      bArr.unshift('0');
    }
  } else {
    for (let i = 0; i > lenNum; i++) {
      aArr.unshift('0');
    }
  }
  for (let i = len - 1; i >= 0; i--) {
    let sum = Number(aArr[i]) + Number(bArr[i]) + carry;
    carry = sum > 10 ? 1 : 0;
    sum = sum > 10 ? sum - 10 : sum;
    res.unshift(sum);
  }
  return res.join('').replaceAll(/^0/g, '');
}

console.log(start('1+15'));
