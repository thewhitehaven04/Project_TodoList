import { v4 as uuidv4 } from 'uuid';

class TaskModel {
  #uuid;

  /**
   * @param {string} dueDate
   */
  constructor(dueDate) {
    this.#uuid = uuidv4();
    this.dueDate = dueDate;
  }

  getId() {
    return this.#uuid;
  }

  /** Returns true if both the task argument and the instance are the same object.
   * @param {TaskModel} task
   * @returns */
  isEqualTo(task) {
    return this.getId == task.getId();
  }
}

export default TaskModel;
