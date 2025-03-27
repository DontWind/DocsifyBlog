function start(a) {
  let arr = a.split(' ').shift();
  let obj = { operation: '', arguments: '' };
  let ret = JSON.parse(JSON.stringify(obj));
  ret.arguments.push(arr.shift());
  let x = ['+', '-'];
  for (let i in arr) {
    if (ret.operation === '') {
      ret.operation=arr[i]
    }else if(typeof arr[i]==='number'){
      ret.arguments
    }
    else if(x.indexOf(arr[i])!==-1){
      ret.arguments
    }
  }
}
