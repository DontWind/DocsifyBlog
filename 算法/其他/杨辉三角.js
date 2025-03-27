/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
  let list = [[1]];
  for (let i = 1; i < numRows; i++) {
    list.push([]);
    for (let j = 0; j <= i; j++) {
      if (j === 0 || j === i) {
        list[i].push(1);
      } else {
        list[i].push(list[i - 1][j - 1] + list[i - 1][j]);
      }
    }
  }
  return list;
};
