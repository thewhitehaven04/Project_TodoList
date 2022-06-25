import { v4 as uuidv4 } from 'uuid';

class Task {
  #uuid;

  constructor(dueDate) {
    this.#uuid = uuidv4();
    this.dueDate = dueDate;
  }

  getId() {
    return this.#uuid;
  }

  /** Returns true if both the task argument is the same as the
   * @param {Task}
   * @returns */
  isEqualTo(task) {
    return this.getId == task.getId();
  }
}

export default Task; 