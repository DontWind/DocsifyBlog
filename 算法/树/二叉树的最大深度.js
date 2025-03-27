// Definition for a binary tree node.
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * @param {TreeNode} root
 * @return {number}
 */ /* 递归 */
var maxDepth = function (root) {
  if (!root) {
    return 0;
  }
  let index = 0,
    max = 0;
  max = calcDepth(root, index, max);
  return max;
};
function calcDepth(root, index, max) {
  index++;
  max = Math.max(index, max);
  if (root.left) {
    max = calcDepth(root.left, index, max);
  }
  if (root.right) {
    max = calcDepth(root.right, index, max);
  }
  index--;
  return max;
}
var maxDepth = function (root) {
  return root === null ? 0 : Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};
let a1 = new TreeNode(3);
let a2 = new TreeNode(9);
let a3 = new TreeNode(20);
let a4 = new TreeNode(15);
let a5 = new TreeNode(7);
a1.left = a2;
a1.right = a3;
a3.left = a4;
a3.right = a5;
console.log(maxDepth(a1));
