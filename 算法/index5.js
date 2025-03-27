let addCost = [0, 100, 200, 360, 220];
let deleteCost = [0, 120, 350, 200, 320];

function start(str) {
  var num = [];
  while (str) {
    num.unshift(str % 10);
    str = parseInt(str / 10);
  }
  console.log(num);
  let n = num.length;
  let dp = Array(n).fill(Array(n).fill(0));
  for (let l = 2; l <= n; l++) {
    for (let i = 0; i < n; i++) {
      let j = i + l - 1;
      if (j >= n) break;
      if (num[i] == num[j]) {
        dp[i][j] = dp[i + 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          Math.min(dp[i + 1][j] + addCost[num[i]], dp[i + 1][j] + deleteCost[num[i]]),
          Math.min(dp[i][j - 1] + addCost[num[j]], dp[i][j - 1] + deleteCost[num[j]])
        );
      }
    }
  }
  console.log(dp[0][n - 1]);
}
start(12322);
