import { progressModel } from './progress';
import TaskModel from '../../task/task';

/**
 * @typedef TaskItemProps
 * @property {string} name task name
 * @property {string} description task description
 * @property {string} priority task priority
 * @property {string} progress an instance of progressModel
 * @property {string} tag task tag
 */

class TaskItemModel extends TaskModel {
  /**
   * @param {TaskItemProps} props
   * @param {Function} callbackPublish
   */
  constructor(props, callbackPublish) {
    super(props.dueDate);
    this.name = props.name;
    this.description = props.description;
    this.priority = props.priority;
    this.progress = progressModel.NOT_STARTED;
    this.tag = props.tag;

    this.publish = callbackPublish;
  }

  _onUpdate(props) {
    this.publish(props);
  }

  /**
   * @param {string} progress
   */
  set progress(progress) {
    throw new Error(
      'Setting progress manually is disabled. Use the "complete" method to complete the task.',
    );
  }

  /**
   * @param {string} newTitle
   */
  set title(newTitle) {
    if (newTitle !== '') {
      this.title = newTitle;
    } else {
      throw new Error('Item title must not be empty!');
    }
  }

  complete() {
    this.progress = progressModel.COMPLETE;
    this._onUpdate(this.toJSON());
  }

  /**
   * @param {TaskItemProps} props task item properties 
   */
  update(props) {
    this.name = this.name || props.name;
    this.description = this.description || props.description;
    this.priority = this.priority || props.priority;
    this.tag = this.tag || props.tag;

    this._onUpdate(this.toJSON());
  }

  /**
   *
   * @returns {TaskItemProps} taskItemProps
   */
  toJSON() {
    return {
      name: this.name,
      description: this.description,
      priority: this.priority,
      progress: this.progress,
      tag: this.tag,
    };
  }
}

export { TaskItemModel };
