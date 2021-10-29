export class SinglyLinkedNode<T> {
	constructor(value: T) {
		this.value = value;
		this.next = null;
	}

	next: SinglyLinkedNode<T> | null;
	value: T | null;

	setValue(value: T) {
		this.value = value;
	}

	getValue() {
		return this.value;
	}

	setNext(next: SinglyLinkedNode<T>) {
		if (next && !(next instanceof SinglyLinkedNode)) {
      throw new Error('setNext expects a SinglyLinkedNode or null');
    }
		this.next = next || null;
	}

	getNext() {
		return this.next;
	}

	hasNext() {
		return !!this.next;
	}
}