import { PubSub } from '../../generic/pubSub';
import { taskEvents } from '../task/taskEvents';
import { TaskStorage } from './taskStorage';

export class TaskStoragePublisher {
  /**
   * @param {import('../task/model').TaskProps[]} tasks
   * @param {PubSub} eventBus
   */
  constructor(tasks = [], eventBus) {
    this.eventBus = eventBus;
    this.eventBus.subscribe(
      taskEvents.taskCreationEvent.getName(),
      this.addTask,
    );

    this.storage = new TaskStorage(tasks);
  }

  addTask = (taskProps) => {
    const taskId = this.storage.addTask(taskProps);
    this.eventBus.pub(taskEvents.taskAddedToStorage.getName(), {
      taskId: taskId,
    });
  };

  getTask = (taskProps) => {
    return this.storage.getTask(taskProps.taskId).toJSON();
  };
}
