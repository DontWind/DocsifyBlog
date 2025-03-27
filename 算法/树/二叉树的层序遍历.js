/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
/* 循环-广度遍历 */
var levelOrder = function (root) {
  if (!root) {
    return [];
  }
  let stack = [root],
    res = [];

  while (stack.length !== 0) {
    let level = [],
      len = stack.length;
    while (len-- > 0) {
      let node = stack.shift();
      level.push(node.val);
      if (node.left) {
        stack.push(node.left);
      }
      if (node.right) {
        stack.push(node.right);
      }
    }
    res.push(level);
  }
  return res;
};
/* 递归-深度遍历 */
var levelOrder = function (root) {
  if (!root) {
    return [];
  }
  let depth = 0,
    res = [];
  function level(root, depth) {
    if (res[depth]) {
      res[depth].push(root.val);
    } else {
      res[depth] = [root.val];
    }
    ++depth;
    if (root.left) {
      level(root.left, depth);
    }
    if (root.right) {
      level(root.right, depth);
    }
  }
  level(root, depth);
  return res;
};
