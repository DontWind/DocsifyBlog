function Table() {
  this.node = [];
  this.line = [];
}
let table = new Table();

function start(n, m, v, u, w) {
  let arrV = v.split(' ');
  let arrU = u.split(' ');
  let arrW = w.split(' ');
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr[i] = Array(n).fill(0);
  }
  for (let i = 0; i < n; i++) {
    arr[arrV[i] - 1][arrU[i] - 1] = arrW[i];
  }
  let minlength = [];
  let node = [];
  for (let i = 0; i < n + 1; i++) {
    minlength[i] = arr[0][i];
    node[i] = 0;
  }
  let j = 0,
    k = 0,
    min = Number.MAX_VALUE;
  let ret = 0;
  for (let i = 1; i < n; i++) {
    j = 0;
    k = 0;
    while (j < n) {
      if (minlength[j] != 0 && minlength[j] < min) {
        min = minlength[j];
        k = j;
      }
      j++;
    }
    minlength[k] = 0;
    ret += min;
    console.log(arr[node[k]], arr[k], min);
    for (j = 0; j < n; j++) {
      if (minlength[j] != 0 && arr[k][j] < minlength[j]) {
        minlength[j] = arr[k][j];
        node[j] = k;
      }
    }
  }
  return ret;
}
start(3, 3, '1 1 2', '2 3 3', '885 513 817');
