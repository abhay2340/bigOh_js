class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // HashMap to store key to Node mapping
    this.head = new Node(null, null); // Dummy head node
    this.tail = new Node(null, null); // Dummy tail node
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key) {
    if (!this.cache.has(key)) {
      return -1; // Key not found
    }

    // Move the accessed node to the front (most recently used)
    const node = this.cache.get(key);
    this.moveToFront(node);

    return node.value;
  }

  //   Put the key-value pair into the cache. If the number of keys exceeds the capacity, evict the least recently used key

  put(key, value) {
    if (this.cache.has(key)) {
      // If the key already exists, update the value and move it to the front
      const node = this.cache.get(key);
      node.value = value;
      this.moveToFront(node);
    } else {
      // If it's a new key
      const newNode = new Node(key, value);
      this.cache.set(key, newNode);
      this.addToFront(newNode);

      if (this.cache.size > this.capacity) {
        // Evict the least recently used (node at the back)
        this.evictLRU();
      }
    }
  }

    //   Move an existing node to the front (most recently used).
 
  moveToFront(node) {
    // Remove the node from its current position
    this.removeNode(node);
    // Add it to the front (just after the head
    this.addToFront(node);
  }

  // Add a new node to the front (most recently used position).

  addToFront(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }

  // Remove a node from the linked list.
  printCache() {
    let temp = new Node(null, null);
    temp = this.head;
    while (temp.next != null) {
      if (temp.value != null) console.log("values are " + temp.value);
      temp = temp.next;
    }
  }
  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  //   Evict the least recently used lru node from the linked list and remove it from the cache.
  evictLRU() {
    const lruNode = this.tail.prev;
    this.removeNode(lruNode);
    this.cache.delete(lruNode.key); // Remove it from the map
  }
}

const cache = new LRUCache(5);
cache.put(1, 1);
cache.put(2, 2);
// console.log(cache.get(1));
cache.put(3, 3);
// console.log(cache.get(2));
cache.put(4, 4);
cache.put(5, 5);
cache.put(6, 6);
// cache.put(5, 5);
// console.log(cache.get(1));
// console.log(cache.get(3));
// console.log(cache.get(4));
cache.printCache();
