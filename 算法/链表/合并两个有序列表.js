//   Definition for singly-linked list.
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
/* 使用第三个列表 */
var mergeTwoLists = function (l1, l2) {
  let dump = new ListNode(0);
  let cur = dump;
  while (l1 !== null && l2 !== null) {
    if (l1.val >= l2.val) {
      cur.next = l2;
      l2 = l2.next;
    } else {
      cur.next = l1;
      l1 = l1.next;
    }
    cur = cur.next;
  }
  cur.next = l1 == null ? l2 : l1;
  return dump.next;
};
