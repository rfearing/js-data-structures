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
	 * @returns {SinglyLinkedNode}
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
		return this.head;
	}

	/**
	 * Remove a node from the end of the list
	 * @returns {SinglyLinkedNode} The removed node
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

	/**
	 * Remove a node from the beginning of the list.
	 * returns {SinglyLinkedNode} The removed node
	 */
	shift() {
		if(this.isEmpty()) {
			return null;
		}

		let oldHead = this.head;
		this.head = oldHead?.getNext() || null;
		this.length--;

		// Unlink the old head.
		oldHead?.setNext();

		// Reset tail if shifted the last node.
		if(this.isEmpty()) {
			this.tail = null;
		}
		return oldHead;
	}

	/**
	 * Add a node to the beginning of the list.
	 * @param {T} val
	 * @returns {SinglyLinkedNode}
	 */
	unshift(value: T) {
		const newNode = new Node(value);
		// Tail and head are the newNode if empty.
		if (this.isEmpty()) {
			this.head = newNode;
			this.tail = this.head;
		}
		// Set newNode next to the current head's next
		newNode.setNext(this.head);
		// Then set as the new head
		this.head = newNode;
		this.length++;
		return this.head;
	}

	/**
	 * Get a value from a node at a given position.
	 * @param {number} index - Where the node is located in the list.
	 * @returns {SinglyLinkedNode | null}
	 */
	get(index: number) {
		if(this.isEmpty() || index >= this.length || index < 0) {
			return null;
		}
		let current = this.head;
		// If index is 0, we'll never loop
		for(let i = 0; i < index; i++) {
			current = current?.getNext() || null;
		}
		return current;
	}

	/**
	 * Set a node at the current position.
	 * @param {T} value - Value to replace at index.
	 * @param {number} index - Where the node is located in the list
	 * @returns {SinglyLinkedNode | null}
	 */
	set(value: T, index: number) {
		// We can utilize the logic from our get method
		let foundNode = this.get(index);
		if (!foundNode) {
			return null;
		}
		foundNode.setValue(value);
		return foundNode;
	}

	/**
	 * Insert a new node at the specified position
	 * @param {T} value - Value for the new node to place at index
	 * @param {number} index - Where the node is located in the list
	 */
	insert(value: T, index: number) {
		if (index > this.length || index < 0) {
			throw new Error('The index was outside of the List');
		}

		if (index === 0) {
			return !!this.unshift(value);
		}

		if (index === this.length) {
			return !!this.push(value);
		}

		const newNode = new Node(value);
		const previous = this.get(index - 1);
		if (previous) {
			newNode.setNext(previous.getNext());
			previous.setNext(newNode);
		}

		this.length++;
		return true;
	}

	/**
	 * Remove a node from the list at a given index.
	 * @param index - The index of the node we want to remove.
	 * @returns {SinglyLinkedNode | null} - The removed node.
	 */
	remove(index: number) {
		// Get head, tail cases first:
		if (index === 0) {
			return this.shift();
		}
		if (index === this.length - 1) {
			return this.pop();
		}

		const previous = this.get(index - 1);
		const removed = previous?.getNext();
		previous?.setNext(removed?.getNext());
		this.length--;
		return removed;
	}

	/**
	 * Reverse the list to point in the opposite direction.
	 * Note, this does not really have a real-world use-case.
	 * Other than to learn, this could be asked, in some contexts, as an interview question.
	 */
	reverse() {
		// TODO
	}
}
