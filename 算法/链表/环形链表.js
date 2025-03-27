/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
/* 快慢指针 */
var hasCycle = function (head) {
  let slow = head,
    fast = head;
  while (fast != null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow.next;
    if (fast === slow) {
      return true;
    }
  }
  return false;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
/* 集合 */
var hasCycle = function (head) {
  let map = new Map();

  while (head != null) {
    if (map.has(head)) {
      return true;
    } else {
      map.set(head, head.val);
    }
    head = head.next;
  }
  return false;
};
