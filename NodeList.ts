
class NodeElem<T> {
  item: T;
  next: NodeElem<T>;
  constructor(item: T, next: NodeElem<T>) {
    this.item = item
    this.next = next
  }
}

class LinkedList<T> {
  head: NodeElem<T>
  last: NodeElem<T>
  size: number = 0

  constructor() {}

  public add(item: T): boolean {
    if (!this.size) {
      this.head = new NodeElem<T>(item, this.last)
    } else {
      const newNode = new NodeElem<T>(item, this.last)
      let nodeIndex = 0, theNode = this.head
      while(nodeIndex < this.size - 1) {
        theNode = theNode.next
        nodeIndex ++
      }
      theNode.next = newNode
    }
    this.size ++
    return true
  }
}

const list = new LinkedList<string>()
list.add("A")
list.add("B")
console.log(list)