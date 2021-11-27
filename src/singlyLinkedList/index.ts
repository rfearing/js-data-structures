import { SinglyLinkedNode as Node } from './node';
import assert from 'assert';

export class SinglyLinkedList<T> {
  constructor() {
    this.#head = null;
    this.#tail = null;
    this.#length = 0;
  }
  // # notates private class:
  #head: Node<T> | null;
  #tail: Node<T> | null;
  #length: number;

  /**
   * Return whether or not the SinglyLinkedList has any nodes.
   * @returns {boolean}
   */
  isEmpty() {
    return this.#length === 0;
  }

  /**
   * Get a node at a given position.
   * @param {number} index - Where the node is located in the list.
   * @returns {SinglyLinkedNode | null}
   */
  #getNode(index: number) {
    if (this.isEmpty() || index >= this.#length || index < 0) {
      return null;
    }
    let current: Node<T> | null = this.#head;
    // If index is 0, we'll never loop
    for (let i = 0; i < index; i++) {
      assert(current); // We are sure we're never out of bounds
      current = current.getNext();
    }
    return current;
  }

  /**
   * Get length of the list.
   * @returns {number}
   */
  getLength() {
    return this.#length;
  }

  /**
   * Insert a node at the end of the list
   * @param {T} val
   * @returns {SinglyLinkedNode}
   */
  insertLast(val: T) {
    const newNode = new Node(val);
    if (this.isEmpty()) {
      this.#head = newNode;
      this.#tail = this.#head;
    } else {
      assert(this.#tail);
      this.#tail.setNext(newNode);
      this.#tail = newNode;
    }
    this.#length++;
    return this.#head;
  }

  /**
   * Remove a node from the end of the list
   * @returns {SinglyLinkedNode} The removed node
   */
  removeLast() {
    if (this.isEmpty()) {
      return null;
    }
    assert(this.#head);

    let newTail = this.#head;
    let current: Node<T> | null = this.#head;
    let persist = true;

    // We want to get to the second to last node:
    while (persist) {
      assert(current);
      newTail = current;
      if (current.getNext()) {
        current = current.getNext();
      } else {
        // If getNext is null. We can safely exit.
        persist = false;
      }
    }

    // and then set it to the new tail:
    newTail.setNext();
    this.#tail = newTail;
    this.#length--;

    // Reset if popped the last node.
    if (this.isEmpty()) {
      this.#head = null;
      this.#tail = null;
    }

    return current;
  }

  /**
   * Remove a node from the beginning of the list.
   * returns {SinglyLinkedNode} The removed node
   */
  removeFirst() {
    if (this.isEmpty()) {
      return null;
    }
    assert(this.#head);
    const oldHead = this.#head;
    this.#head = oldHead.getNext() || null;
    this.#length--;

    // Unlink the old head.
    oldHead.setNext();

    // Reset tail if shifted the last node.
    if (this.isEmpty()) {
      this.#tail = null;
    }
    return oldHead;
  }

  /**
   * Add a node to the beginning of the list.
   * @param {T} val
   * @returns {SinglyLinkedNode}
   */
  insertFirst(value: T) {
    const newNode = new Node(value);
    // Tail and head are the newNode if empty.
    if (this.isEmpty()) {
      this.#head = newNode;
      this.#tail = this.#head;
    }
    // Set newNode next to the current head's next
    newNode.setNext(this.#head);
    // Then set as the new head
    this.#head = newNode;
    this.#length++;
    return this.#head;
  }

  /**
   * Get a value from a node at a given position.
   * @param {number} index - Where the node is located in the list.
   * @returns {T} - the value passed into the SinglyLinkedNode constructor
   */
  get(index: number) {
    const searchedNode = this.#getNode(index);
    return searchedNode ? searchedNode.getValue() : null;
  }

  /**
   * Set a node at the current position.
   * @param {T} value - Value to replace at index.
   * @param {number} index - Where the node is located in the list
   * @returns {SinglyLinkedNode | null}
   */
  set(value: T, index: number) {
    // We can utilize the logic from our get method
    const foundNode = this.#getNode(index);
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
    if (index > this.#length || index < 0) {
      throw new Error('The index was outside of the List');
    }

    if (index === 0) {
      return !!this.unshift(value);
    }

    if (index === this.#length) {
      return !!this.push(value);
    }

    const newNode = new Node(value);
    const previous = this.#getNode(index - 1);
    if (previous) {
      newNode.setNext(previous.getNext());
      previous.setNext(newNode);
    }

    this.#length++;
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
    if (index === this.#length - 1) {
      return this.pop();
    }

    const previous = this.#getNode(index - 1);
    assert(previous);

    const removed = previous.getNext();
    assert(removed);

    previous.setNext(removed.getNext());
    this.#length--;
    return removed;
  }

  /**
   * Reverse the list to point in the opposite direction.
   * Note, this does not really have a real-world use-case.
   * Other than to learn, this could be asked, in some contexts, as an interview question.
   * @returns {SinglyLinkedList<T>}
   */
  reverse() {
    // Swap head for tail:
    let node = this.#head;
    this.#head = this.#tail;
    this.#tail = node;
    let next;
    let previous = null;
    for (let i = 0; i < this.#length; i++) {
      assert(node);
      next = node.next; // First iteration, this will be this.#head.next
      node.setNext(previous); // First iteration, will set next to null, as it's the new tail.
      previous = node;
      node = next;
    }
    return null;
  }

  // Aliases
  push = this.insertLast;
  pop = this.removeLast;
  shift = this.removeFirst;
  unshift = this.insertFirst;
}
