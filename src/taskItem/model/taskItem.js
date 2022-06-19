import { progressModel } from './progress';
import Task from '../../task/task';

class TaskItem extends Task {
  #progress;

  constructor(name, description, priority, dueDate, { imageUrl, tag } = {}) {
    super();
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate;
    this.#progress = progressModel.NOT_STARTED;
    this.imageUrl = imageUrl;
    this.tag = tag;
  }

  updateName(newName) {
    this.name = newName;
  }

  updateDescription(newDescription) {
    this.description = newDescription;
  }
}

export { TaskItem };
