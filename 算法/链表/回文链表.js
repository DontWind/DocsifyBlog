//   Definition for singly-linked list.
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} head
 * @return {boolean}
 */
/* 栈 */
var isPalindrome = function (head) {
  let fast = head,
    slow = head,
    stack = [];
  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    stack.push(slow.val);
    slow = slow.next;
  }
  if (fast !== null) {
    slow = slow.next;
  }
  while (slow !== null) {
    if (stack.pop() !== slow.val) {
      return false;
    }
    slow = slow.next;
  }
  return true;
};
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
/* 反转后半部分链表 */
var isPalindrome = function (head) {
  let fast = head,
    slow = head;
  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow.next;
  }
  if (fast !== null) {
    slow = slow.next;
  }
  slow = reverse(slow);
  fast = head;
  while (slow !== nul) {
    if (fast.val !== slow.val) {
      return false;
    }
    fast = fast.next;
    slow = slow.next;
  }
  return true;
};

function reverse(node) {
  let prev = null;
  while (node !== null) {
    let head = node.next;
    node.next = prev;
    prev = node;
    node = head;
  }
  return prev;
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
 * @return {boolean}
 */
/* 递归 */
var isPalindrome = function (head) {
  return reversex(head, head) === null ? true : false;
};

function reversex(node, head) {
  if (node.next != null) {
    let flag = reversex(node.next, head);
    if (!flag) {
      return false;
    }
    head = flag;
  }
  console.log(node, head);
  if (node.val === head.val) {
    return head.next;
  }
  return false;
}

let a1 = new ListNode(1);
let a2 = new ListNode(2);
let a3 = new ListNode(2);
let a4 = new ListNode(1);
let a5 = new ListNode(5);
a1.next = a2;
a2.next = a3;
a3.next = a4;
console.log(isPalindrome(a1));
