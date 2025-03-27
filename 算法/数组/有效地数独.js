/**
 * @param {character[][]} board
 * @return {boolean}
 */
/* 二维数组直接判断 */
var isValidSudoku = function (board) {
  let len = board.length
  let line = new Array(len),
    column = new Array(len),
    cell = new Array(9)
  for (let i = 0; i < len; i++) {
    line[i] = new Array(len)
    column[i] = new Array(len)
    cell[i] = new Array(len)
  }
  for (let i = 0; i < len; ++i) {
    for (let j = 0; j < len; ++j) {
      if (board[i][j] === '.') {
        continue
      }
      let num = board[i][j] - 1
      let k = parseInt(i / 3) * 3 + parseInt(j / 3)
      if (line[i][num] || column[j][num] || cell[k][num]) {
        console.log(i, j, board[i][j], line[i][num], column[j][num], cell[k][num]);
        return false
      }
      line[i][num] = column[j][num] = cell[k][num] = 1
    }
  }
  return true
};

var isValidSudoku = function (board) {
  let len = board.length
  let line = new Array(len),
    column = new Array(len),
    cell = new Array(len)
  let shift = 0
  for (let i = 0; i < len; ++i) {
    for (let j = 0; j < len; ++j) {
      if (board[i][j] === '.') {
        continue
      }
      shift = 1 << (board[i][j] - '0')
      let k = parseInt(i / 3) * 3 + parseInt(j / 3)
      if (line[i] & shift || column[j] & shift || cell[k] & shift) {
        return false
      }
      console.log(`${line[i]}&${shift}=${line[i] & shift}` );

      line[i] |= shift
      column[j] |= shift
      cell[k] |= shift
    }
  }
  return true
};

let arr = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"]
]
isValidSudoku(arr)