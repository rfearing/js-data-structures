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
		const newNode = new Node(val);
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
}
