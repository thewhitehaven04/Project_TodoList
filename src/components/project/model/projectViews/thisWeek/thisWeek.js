import { isThisWeek } from 'date-fns';

class ThisWeek {
  #project;

  constructor(project) {
    this.project = project;
  }

  // Get all tasks that have an ongoing week as their dueDate.
  getView() {
    return this.project.getTodos((todo) => isThisWeek(todo.getDueDate()));
  }
}
