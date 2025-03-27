function start(date, str) {
  let day = date.split(' ')[0].split('-'),
    time = date.split(' ')[1].split(':');
  str = str.split(' ');

  for (let i in str) {
    let arr = str[i].split(''),
      getF = arr.shift();
    if (getF === '+') {
      let control = arr.pop();
      let num = parseInt(arr.join(''));
      if (control === 'd') {
        day[2] = parseInt(day[2]) + num;
      } else if (control === 'h') {
        time[0] = parseInt(time[0]) + num;
      } else if (control === 'm') {
        time[1] = parseInt(time[1]) + num;
      } else if (contorl === 's') {
        time[2] = parseInt(time[2]) + num;
      } else if (control === 'W') {
        day[2] = parseInt(day[2]) + 7 * num;
      }
    } else if (getF === '-') {
      let control = arr.pop();
      let num = 0;
      if (arr.length !== 1) {
        num = parseInt(arr.join(''));
      }
      if (control === 'd') {
        day[2] = parseInt(day[2]) - num;
      } else if (control === 'h') {
        time[0] = parseInt(time[0]) - num;
      } else if (control === 'm') {
        time[1] = parseInt(time[1]) - num;
      } else if (contorl === 's') {
        time[2] = parseInt(time[2]) - num;
      } else if (control === 'W') {
        day[2] = parseInt(day[2]) - 7 * num;
      }
    }
  }
  if (time[2] >= 60) {
    let num = Math.floor(time[2] / 60);
    time[2] = time[2] % 60;
    time[1] += num;
  } else if (time[2] < 0) {
    let num = Math.floor(time[2] / 60) - 1;
    time[2] = 60 - (time[2] % 60);
    time[1] += num;
  }
  if (time[1] >= 60) {
    let num = Math.floor(time[1] / 60);
    time[1] = time[1] % 60;
    time[0] += num;
  } else if (time[1] < 0) {
    let num = Math.floor(time[1] / 60) - 1;
    time[1] = 60 - (time[1] % 60);
    time[0] += num;
  }
  if (time[0] >= 24) {
    let num = Math.floor(time[0] / 24);
    time[0] = time[0] % 24;
    day[2] += num;
  } else if (time[0] < 0) {
    let num = Math.floor(time[0] / 24) - 1;
    time[0] = 24 - (time[0] % 24);
    day[2] += num;
  }

  

  if (day[2] < 10 && day[2] >= 1) {
    day[2] = '0' + day[2];
  }
  if (time[0] < 10 && time[0] >= 1) {
    time[0] = '0' + time[0];
  }
  if (time[1] < 10 && time[1] >= 1) {
    time[1] = '0' + time[1];
  }
  if (time[2] < 10 && time[2] >= 1) {
    time[2] = '0' + time[2];
  }
  let ret = day.join('-') + ' ' + time.join(':');
  console.log(ret);
}
start('2021-09-13 00:00:00', '+3m +3h');
