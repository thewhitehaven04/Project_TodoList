import { v4 as uuidv4 } from 'uuid';

class Task {
  #uuid;

  constructor() {
    this.#uuid = uuidv4();
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