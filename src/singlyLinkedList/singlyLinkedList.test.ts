import { SinglyLinkedList } from ".";

test('SinglyLinkedList correctly pushes to the end of the list', () => {
	const newList = new SinglyLinkedList();
	expect(newList.head).toBeNull();
	newList.push('1');
	newList.push('2');
	newList.push({ hello: 'world' });
	expect(newList.head?.getValue()).toEqual('1');
	expect(newList.head?.getNext()?.getValue()).toEqual('2');
	expect(newList.tail?.getValue()).toEqual({ hello: 'world' });
	expect(newList.length).toEqual(3);
})