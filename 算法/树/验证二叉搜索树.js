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
/* 递归 */
var isValidBST = function (root) {
  return validBST(root, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
};
function validBST(root, minVal, maxVal) {
  if (root.val !== null) {
    return true;
  }
  if (root.val <= minVal || root.val >= maxVal) {
    return false;
  }
  return validBST(root.left, minVal, root.val) && validBST(root.right, root.val, maxVal);
}
let prev = null;
var isValidBST = function (root) {
  if (!root) {
    return true;
  }
  if (!isValidBST(root.left)) {
    return false;
  }
  if (prev !== null && prev.val >= root.val) {
    return false;
  }
  prev = root;
  if (!isValidBST(root.right)) return false;
  return true;
};
let a0 = new TreeNode(0);
let a1 = new TreeNode(5);
let a2 = new TreeNode(4);
let a3 = new TreeNode(6);
let a4 = new TreeNode(3);
let a5 = new TreeNode(7);
a1.left = a2;
a1.right = a3;
a3.left = a4;
a3.right = a5;
console.log(a0);
console.log(isValidBST(a0));
