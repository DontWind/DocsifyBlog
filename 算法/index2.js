let class2type = {};
'Array Date RegExp Object Error'
  .split(' ')
  .forEach(e => (class2type['[object ' + e + ']'] = e.toLowerCase()));

function type(obj) {
  if (obj === null) {
    return String(obj);
  }
  return typeof obj === 'object'
    ? class2type[Object.prototype.toString.call(obj)] || 'object'
    : typeof obj;
}

function start(a, b) {
  let arr = Object.keys(a),
    arr2 = Object.keys(b);
  for (let i in arr2) {
    if (arr.indexOf(arr2[i]) !== -1) {
      let type1 = type(a[arr2[i]]),
        type2 = type(b[arr2[i]]);
      if (type1 !== type2) {
        throw 'error';
      }
      if (type1 === 'array') {
        a[arr2[i]] = a[arr2[i]].concat(b[arr2[i]]);
      } else if (type1 === 'number') {
        let x = [];
        x.push(a[arr2[i]]);
        x.push(b[arr2[i]]);
        a[arr2[i]] = x;
      } else if (type1 === 'object') {
        let c = {};
        Object.assign(c, a[arr2[i]], b[arr2[i]]);
        a[arr2[i]] = c;
      }
    } else {
      a[arr2[i]] = b[arr2[i]];
    }
  }
  return a;
}

console.log(start({ a: [1] }, { a: [2] }));
