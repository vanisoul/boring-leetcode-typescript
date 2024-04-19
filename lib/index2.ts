class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// Input: l1 = [2,4,3], l2 = [5,6,4]
// Output: [7,0,8]
// Explanation: 342 + 465 = 807.
function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null,
): ListNode | null {
  let currentL1: ListNode | null | undefined = l1;
  let currentL2: ListNode | null | undefined = l2;
  let carry = 0;
  let result = new ListNode();
  let currentResult = result;
  while (currentL1 || currentL2) {
    // Calculate sum
    const sum = (currentL1?.val || 0) + (currentL2?.val || 0) + carry;

    // Calculate carry and create new node
    carry = Math.floor(sum / 10);
    const nextNode = new ListNode(sum % 10);
    currentResult.next = nextNode;

    // Move to next node
    currentResult = currentResult.next;
    currentL1 = currentL1?.next;
    currentL2 = currentL2?.next;
  }

  if (carry > 0) {
    currentResult.next = new ListNode(carry);
  }

  return result.next;
}

// l1 =
// [9,9,9,9,9,9,9]
// l2 =
// [9,9,9,9]
export default function main() {
  const l1 = new ListNode(
    9,
    new ListNode(
      9,
      new ListNode(
        9,
        new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9)))),
      ),
    ),
  );
  const l2 = new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9))));

  const result = addTwoNumbers(l1, l2);
  console.log(JSON.stringify(result));
}
