import { SinglyLinkedList } from '../src/singlyLinkedList';

let newList:SinglyLinkedList<string | number | object>;

beforeEach(() => {
	newList = new SinglyLinkedList();
});

describe('SinglyLinkedList Functionality: ', () => {
	describe('new instance', () => {
		it('has null head/tail', () => {
			expect(newList.get(0)).toBeNull();
		});
	});

	describe('.getLength', () => {
		it('return the length of the list', () => {
			newList.push(1);
			newList.push(2);
			expect(newList.getLength()).toEqual(2);
		});
	});

	describe('Adding nodes:', () => {
		describe('.insertLast(value) & .push(value) method', () => {
			it('adds node to end of list', () => {
				newList.insertLast('1');
				newList.push({ hello: 'world' });
				expect(newList.get(0)).toEqual('1');
				expect(newList.get(1)).toEqual({ hello: 'world' });
			});
		});

		describe('.insertFirst() & .unshift() method', () => {
			it('Add a node from beginning of list', () => {
				newList.insertFirst('a');
				newList.unshift('b');
				expect(newList.get(0)).toEqual('b');
				expect(newList.get(1)).toEqual('a');
			});
		});

		describe('.insert(value, index) method', () => {
			it('adds the value at the given index', () => {
				newList.insert('hello', 0);
				newList.insert('world', 1);
				expect(newList.get(0)).toEqual('hello');
			});
		});
	}); // adding nodes

	describe('Updating Nodes', () => {
		beforeEach(() => {
			newList.push('hello');
			newList.push('goodbye');
		});

		describe('.set(value, index) method', () => {
			it('sets the value at the given index', () => {
				newList.set('goodbye', 0);
				expect(newList.get(0)).toEqual('goodbye');
			});
		});

		describe('.reverse() method', () => {
			it('reverses the values in the array', () => {
				newList.reverse();
				expect(newList.get(0)).toEqual('goodbye');
			});
		});
	});

	describe('Removing Nodes', () => {
		beforeEach(() => {
			newList.push(1);
			newList.push(2);
			newList.push(3);
		});

		describe('.removeLast() & .pop() method', () => {
			it('remove node from end of list', () => {
				newList.removeLast();
				newList.pop();
				expect(newList.get(0)).toEqual(1);
			});
		});

		describe('.removeFirst() & .shift() method', () => {
			it('remove node from beginning of list', () => {
				newList.removeFirst();
				newList.shift();
				expect(newList.get(0)).toEqual(3);
			});
		});
	}); // removing nodes
});
