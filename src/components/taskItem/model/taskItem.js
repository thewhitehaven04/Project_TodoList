import { progressModel } from './progress';
import Task from '../../task/task';

class TaskItem extends Task {
  constructor(name, description, priority, dueDate, tag = null, callbackPublish) {
    super(dueDate);
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.progress = progressModel.NOT_STARTED;
    this.tag = tag;

    this.publish = callbackPublish;
  }

  /** Updates the model */
  update({ name, description, priority, progress, tag }) {
    this.name = this.name || name;
    this.description = this.description || description;
    this.priority = this.priority || priority;
    this.progress = this.progress || progress;
    this.tag = this.tag || tag;

    this.onUpdate({ name, description, priority, progress, tag });
  }

  onUpdate({ name, description, priority, progress, tag }) {
    this.publish({ name, description, priority, progress, tag });
  }

  get() {
    return {
      name: this.name,
      description: this.description,
      priority: this.priority,
      progress: this.progress,
      tag: this.tag,
    };
  }
}

export { TaskItem };
