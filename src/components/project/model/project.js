import { TaskItem } from '../../taskItem/model/taskItem';

export class Project {
  /** A list of todos, be it task items or checklists. */
  #todos;
  /** Project title */
  #title;

  /**
   * 
   * @param {String} title 
   * @param  {...Todo} todos 
   */
  constructor(title, ...todos) {
    this.#title = title;
    [this.#todos] = todos;
  }

  /**
   * @param {TaskItem} todo
   */
  addTodo(todo) {
    this.#todos.push(todo);
  }

  /**
   * @param {TaskItem} todo
   */
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

  /**
   * Return project title.
   * @returns {String} title
   */
  getTitle() {
    return this.#title;
  }

  /**
   * Update project title
   * @param {String} newTitle
   */
  updateTitle(newTitle) {
    this.#title = newTitle;
  }
}
