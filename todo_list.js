// This class represents a todo item and its associated
// data: the todo title and a flag that shows whether the
// todo item is done.

class Todo {
  static DONE_MARKER = "X";
  static UNDONE_MARKER = " ";

  constructor(title) {
    this.title = title;
    this.done = false;
  }

  toString() {
    let marker = this.isDone() ? Todo.DONE_MARKER : Todo.UNDONE_MARKER;
    return `[${marker}] ${this.title}`;
  }

  markDone() {
    this.done = true;
  }

  markUndone() {
    this.done = false;
  }

  isDone() {
    return this.done;
  }

  getTitle() {
    return this.title;
  }
}


// This class represents a collection of Todo objects.
// You can perform typical collection-oriented actions
// on a TodoList object, including iteration and selection.

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }
  add(todo) {
    if (!(todo instanceof Todo)) {
      throw new TypeError ("can only add Todo objects");
    }
    this.todos.push(todo);
  }

  markDoneAt(index) {
    this.itemAt(index).markDone();
  }

  markUndoneAt(index) {
    this.itemAt(index).markUndone();
  }

  isDone() {
    return this.todos.every((todo) => { return todo.isDone() })
  }
  
  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0];
  }

  last() {
    let lastIndex = this.size() - 1;
    return this.todos[lastIndex];
  }

  itemAt(position) {
    this._validateIndex(position);
    return this.todos[position];
  }

  _validateIndex(index) {
    if (!(index in this.todos)) {
      throw new ReferenceError(`invalid index: ${index}`)
    }
  }
  shift() {
    return this.todos.shift();
  }
  pop() {
    return this.todos.pop();
  }
  removeAt(index) {
    this._validateIndex(index);
    return this.todos.splice(index, 1);
  }

  toString() {
    let title = `---- ${this.title} ----`;
    let list = this.todos.map((todo) => {
      return `${todo.toString()}\n`;
    }).join("");
    console.log(list);
    return `${title}\n${list}`;
  }

  forEach(callback) {
    this.todos.forEach(todo => {
      callback(todo);
    });
  }

  filter(callback) {
    let filteredList = new TodoList(this.title);
    this.forEach((todo) => {
      if (callback(todo)) {
        filteredList.add(todo);
      }
    })
    return filteredList;
  }
}

let todo1 = new Todo("Buy milk");
let todo2 = new Todo("Clean room");
let todo3 = new Todo("Go to the gym");
let todo4 = new Todo("Go shopping");
let todo5 = new Todo("Feed the cats");
let todo6 = new Todo("Study for Launch School");
let list = new TodoList("Today's Todos");

list.add(todo1);
list.add(todo2);
list.add(todo3);
list.add(todo4);
list.add(todo5);
list.add(todo6);
todo1.markDone();
todo5.markDone();

// let doneTodos = list.filter(todo => todo.isDone());
// console.log(doneTodos);

let newList = list.filter(todo => todo.isDone()).first();
console.log(newList);