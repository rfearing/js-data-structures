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

test.todo('SinglyLinkedList get method correctly returns the value of a node at the correct index of the list');
test.todo('SinglyLinkedList set method correctly sets the value of a node at the correct index of the list');
test.todo('SinglyLinkedList insert method correctly inserts a node at the correct index of the list');
test.todo('SinglyLinkedList remove method correctly removes a node from the correct index of the list');
test.todo('SinglyLinkedList reverse method correctly reverses the order of the nodes in the list');
