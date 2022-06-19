/** This module specifies the Today project view (all project todos set for today) */
import isToday from 'date-fns/isToday';

class Today {
  #project; 
  
  constructor(project) {
    this.#project = project;
  }

  getView() {
    return this.project.getTodos((todo) => todo.getDueDate().isToday());
  }
}
