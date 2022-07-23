import { v4 as uuidv4 } from 'uuid';
import { TaskModel } from '../task/model';

export class TaskStorage {
  /**
   *
   * @param {import('../task/model').TaskProps[]} tasks
   */
  constructor(tasks = []) {
    this.tasks = new Map();
  }

  /**
   * @param {import('../task/model').TaskProps} taskProps
   */
  addTask(taskProps) {
    const taskId = uuidv4();
    this.tasks.set(taskId, new TaskModel(taskProps));
    return taskId;
  }

  /**
   * @param {String} taskId
   * @return {TaskModel}
   */
  getTask(taskId) {
    return this.tasks.get(taskId);
  }
}
