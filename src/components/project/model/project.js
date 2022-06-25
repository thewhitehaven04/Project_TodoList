export class Project {
  /** A list of todos, be it task items or checklists. */
  #todos;
  /** Project title */
  #title;

  constructor(title, ...todos) {
    this.#title = title;
    [this.#todos] = todos;
  }
  
  addTodo(todo) {
    this.#todos.push(todo);
  }

  removeTodo(todo) {
    this.#todos = this.#todos.filter((arrayTodo) => arrayTodo.isEqualTo(todo));
  }

  /** Returns todos that satisfy the supplied filter functions  */
  getTodos(...filterFns) {
    let arr = this.#todos;
    for (let filterFn of filterFns) {
      arr = arr.map(filterFn);
    }
    return arr;
  }

  getTitle() {
    return this.#title;
  }

  updateTitle(newTitle) {
    this.#title = newTitle;
  }
}

