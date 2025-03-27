/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
/* 递归 */
var reverseList = function (head) {
  if (head === null) {
    return null;
  }
  let json = { node: null };
  reverseNode(head, json);
  head.next = null;
  return json.node;
};

function reverseNode(node, json) {
  if (node.next !== null) {
    let prevNode = reverseNode(node.next, json);
    prevNode.next = node;
  } else {
    json.node = node;
  }
  return node;
}

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
/* 迭代 */
var reverseList = function (head) {
  let arr = [];
  while (head !== null) {
    arr.push(head);
    head = head.next;
  }
  if (arr.length === 0) {
  }
  let node = arr.pop(),
    newHead = node;
  for (let i = 0; arr.length !== 0; i++) {
    node.next = arr.pop();
    node = node.next;
  }
  node.next = null;
  return newHead;
};
