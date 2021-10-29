import { SinglyLinkedList } from "../src/singlyLinkedList";

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
})