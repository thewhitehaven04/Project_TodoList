/** This module specifies the Today project view (all project todos set for today) */
import isToday from 'date-fns/isToday';

export class Today {
  #project; 
  
  constructor(project) {
    this.#project = project;
  }

  /** Get all the todos that have an ongoing week as their dueDate. */
  getView() {
    return this.project.getTodos((todo) => todo.getDueDate().isToday());
  }
}
