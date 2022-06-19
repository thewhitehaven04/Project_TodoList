export class Project {
  /** A list of todos, be it task items or checklists. */
  #todos;
  /** Project title */
  #title;

  constructor(title, todos) {
    this.#title = title;
    this.#todos = todos;
  }

  updateTitle(newTitle) {
    this.#title = newTitle;
  }

  addTodo(todo) {
    this.#todos.push(todo);
  }

  removeTodo(todo) {
    this.#todos = this.#todos.filter((arrayTodo) => arrayTodo.isEqualTo(todo));
  }

  getTitle() {
    return this.#title;
  }
}

