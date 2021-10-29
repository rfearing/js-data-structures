import { SinglyLinkedList } from '../src/singlyLinkedList';

let newList = new SinglyLinkedList();

test('SinglyLinkedList push method correctly adds to the end of the list', () => {
	expect(newList.head).toBeNull();
	newList.push('1');
	newList.push('2');
	newList.push({ hello: 'world' });
	expect(newList.head?.getValue()).toEqual('1');
	expect(newList.head?.getNext()?.getValue()).toEqual('2');
	expect(newList.tail?.getValue()).toEqual({ hello: 'world' });
	expect(newList.length).toEqual(3);
});

test('SinglyLinkedList pop method correctly removes to the end of the list', () => {
	newList.pop();
	expect(newList.tail?.getValue()).toEqual('2');
	expect(newList.length).toEqual(2);
	newList.pop();
	// Should be only one node left:
	expect(newList.head).toEqual(newList.tail);
	newList.pop();
	// Should be null
	expect(newList.head).toBeNull();
	newList.pop();
	// Nothing happens if we popped an empty list
	expect(newList.head).toBeNull();
});

test('SinglyLinkedList shift method correctly removes from the beginning of the list', () => {
	// Shouldn't do anything to an empty list.
	newList.shift();
	expect(newList.head).toBeNull();
	// Add back to the list to have things to test.
	newList.push('a');
	newList.push('b');
	newList.shift();
	expect(newList.head?.getValue()).toEqual('b');
	newList.shift();
	// Check again that resets list after shifting the last node.
	expect(newList.head).toBeNull();
	expect(newList.tail).toBeNull();
});

test('SinglyLinkedList unshift method correctly adds to the beginning of the list', () => {
	newList.unshift('Scooby');
	expect(newList.length).toEqual(1);
	expect(newList.head).toEqual(newList.tail);
	newList.unshift('Dooby');
	newList.unshift('Doo');
	expect(newList.tail?.getValue()).toEqual('Scooby');
	expect(newList.head?.getValue()).toEqual('Doo');
	expect(newList.head?.getNext()?.getValue()).toEqual('Dooby');
});

test('SinglyLinkedList get method correctly returns the value of a node at the correct index of the list', () => {
	expect(newList.get(0)?.getValue()).toEqual('Doo');
	expect(newList.get(1)?.getValue()).toEqual('Dooby');
	// Index larger than length should return null
	expect(newList.get(10)).toBeNull();
});

test('SinglyLinkedList set method correctly sets the value of a node at the correct index of the list', () => {
	newList.set('example', 1);
	const newValue = newList.get(1);
	expect(newValue?.getValue()).toEqual('example');
});

test('SinglyLinkedList insert method correctly inserts a node at the correct index of the list', () => {
	const currentLength = newList.length;
	newList.insert('Test', currentLength);
	// Correctly sets if tail
	expect(newList.tail?.getValue()).toEqual('Test');
	expect(newList.length).toEqual(currentLength + 1);
	// Correctly sets if head
	expect(newList.insert('Lorem', 0));
	expect(newList.head?.getValue()).toEqual('Lorem');
	// Correctly sets in middle
	newList.insert('Foo', 2);
	expect(newList.get(2)?.getValue()).toEqual('Foo');
	// Outside of list scope:
	expect(() => newList.insert('Bar', -1)).toThrowError();
});

test('SinglyLinkedList remove method correctly removes a node from the correct index of the list', () => {
	const previousOne = newList.get(1);
	const previousThree = newList.get(3);
	const previousLength = newList.length;
	newList.remove(2);
	// Expect everything to shift over one:
	expect(newList.get(2)).toEqual(previousThree);
	expect(newList.length).toEqual(previousLength -1);
	newList.remove(0);
	expect(newList.head).toEqual(previousOne);
});

test('SinglyLinkedList reverse method correctly reverses the order of the nodes in the list', () => {
	const oldHead = newList.head;
	const oldTail = newList.tail;
	const oldLength = newList.length;
	const secondToLast = newList.get(oldLength - 2);
	newList.reverse();
	expect(newList.head?.getValue()).toEqual(oldTail?.getValue());
	expect(newList.tail?.getValue()).toEqual(oldHead?.getValue());
	expect(newList.length).toEqual(oldLength);
	// Traverse to check the middle nodes
	expect(newList.head?.getNext()?.getValue()).toEqual(secondToLast?.getValue());
});
