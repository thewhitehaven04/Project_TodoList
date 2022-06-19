import { v4 as uuidv4 } from 'uuid';
import Task from '../../task/task';

class Checklist extends Task {
  #entries;

  constructor(...entries) {
    super();
    this.#entries = entries;
    this.isComplete = false;
  }

  addEntry(entry) {
    this.#entries.push(entry);
  }
}

export { Checklist };
