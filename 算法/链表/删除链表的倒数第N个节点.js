// Definition for singly-linked list.
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
/* 递归 */
var removeNthFromEnd = function (head, n) {
  if (head === null) {
    return [];
  }
  searchNode(head, n, head);
  return head;
};

function searchNode(node, n, head) {
  let json = {};
  if (node.next && n) {
    json = searchNode(node.next, n, head);
    if (json === null) {
      return null;
    }
  } else {
    return { flag: true, n: --n };
  }

  if (json.n === 0) {
    node.next = node.next.next;
    return null;
  }

  if (node === head) {
    node.val = node.next.val;
    node.next = node.next.next;
    return null;
  }
  if (json.flag) {
    return { flag: true, n: --json.n };
  }
}
let a1 = new ListNode(1);
let a2 = new ListNode(2);
let a3 = new ListNode(3);
let a4 = new ListNode(4);
let a5 = new ListNode(5);
a1.next = a2;
// a2.next = a3;
// a3.next = a4;
// a4.next = a5;
function print() {
  let head = removeNthFromEnd(a1, 2);
  while (head.next !== null) {
    console.log(head);
    head = head.next;
  }
}
print();

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
/* 双指针 */
var removeNthFromEnd = function (head, n) {
  let first = head,
    slow = head;
  for (let i = 0; i < n; i++) {
    first = first.next;
  }
  if (first === null) {
    return head.next;
  }
  while (first.next != null) {
    first = first.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return head;
};
