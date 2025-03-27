// Definition for a binary tree node.
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  if (!root) return true;
  return symmetric(root.left, root.right);
};
function symmetric(left, right) {
  if (left === null && right === null) {
    return true;
  }
  if (left === null || right === null || left.val !== right.val) {
    return false;
  }
  return symmetric(left.left, right.right) && symmetric(left.right, right.left);
}
let a0 = new TreeNode();
let a1 = new TreeNode(1);
let a2 = new TreeNode(2);
let a3 = new TreeNode(2);
let a4 = new TreeNode(2);
let a5 = new TreeNode(2);
let a6 = new TreeNode(2);
a1.left = a2;
a1.right = a3;
a3.left = a4;
// a3.right = a5;
a2.left = a6;
a2.right = a0;
console.log(a1);
console.log(isSymmetric(a1));
