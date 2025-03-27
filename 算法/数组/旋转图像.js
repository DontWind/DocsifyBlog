/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
/* 上下交换，对角线交换 */
var rotate = function (matrix) {
  let len = matrix.length
  for (let i = 0; i < len / 2; i++) {
    [matrix[i], matrix[len - 1 - i]] = [matrix[len - 1 - i], matrix[i]]
  }
  for (let i = 0; i < len; i++) {
    for (let j = i+1; j < len; j++) {
        [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
      }
  }
  console.log(matrix);
};
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
/* 直接交换 */
var rotate = function (matrix) {
  let len = matrix.length
  for (let i = 0; i < len / 2; i++) {
   for(let j=i;j<len-i-1;j++){
     let temp=matrix[i][j],m=len-j-1,n=len-i-1
     matrix[i][j]=matrix[m][i]
     matrix[m][i]=matrix[n][m]
     matrix[n][m]=matrix[j][n]
     matrix[j][n]=temp     
   }
  }
  console.log(matrix);
};
rotate([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
])