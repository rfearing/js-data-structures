import { SinglyLinkedNode as Node } from './node';

export class SinglyLinkedList<T> {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}
	head: Node<T> | null;
	tail: Node<T> | null;
	length: number;

	/**
	 * Return whether or not the SinglyLinkedList has any nodes.
	 * @returns {boolean}
	 */
	isEmpty() {
		return (this.length === 0);
	}

	/**
	 * Insert a node at the end of the list
	 * @param {T} val
	 * @returns {SinglyLinkedList<T>}
	 */
	push(val:T) {
		let newNode = new Node(val);
		if (this.isEmpty()) {
			this.head = newNode;
			this.tail = this.head;
		} else {
			this.tail?.setNext(newNode);
			this.tail = newNode;
		}
		this.length++;
		return this;
	}

	/**
	 * Remove a node from the end of the list
	 * @returns {SinglyLinkedNode}
	 */
	pop() {
		if (this.isEmpty()) {
			return null;
		}
		let newTail = this.head;
    let current = this.head;

		// We want to get to the second to last node:
		while(current?.getNext()) {
			newTail = current;
			current = current.getNext();
		}

		// and then set it to the new tail:
		newTail?.setNext();
		this.tail = newTail;
		this.length--;

		// Reset if popped the last node.
		if(this.isEmpty()) {
			this.head = null;
			this.tail = null;
		}

		return current;
	}
}
