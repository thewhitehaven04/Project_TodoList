/**
 * @typedef TaskProps
 * @type {Object}
 * @property {String} name task name
 * @property {String} description task description
 * @property {String} dueDate projected task completion date
 * @property {String} priority task priority
 * @property {String} progress an instance of progressModel
 * @property {String} tag task tag
 */
import { progressModel } from '../progress/model';

export class TaskModel {
  #progress;

  /**
   * @param {TaskProps} props
   */
  constructor(
    props = {
      name: '',
      description: '',
      dueDate: '',
      priority: '',
      progress: progressModel.NOT_STARTED.name,
      tag: '',
    },
  ) {
    this.name = props.name;
    this.description = props.description;
    this.dueDate = props.dueDate;
    this.priority = props.priority;
    this.#progress = progressModel.NOT_STARTED.name;
    this.tag = props.tag;
  }

  complete() {
    this.#progress = progressModel.COMPLETE.name;
  }

  /**
   * @param {TaskProps} props task item properties
   */
  update(props) {
    this.name = props.name;
    this.description = props.description;
    this.priority = props.priority;
    this.tag = props.tag;
    this.dueDate = props.dueDate;
  }

  /**
   * @returns {TaskProps} taskItemProps
   */
  toJSON() {
    return {
      name: this.name,
      description: this.description,
      priority: this.priority,
      progress: this.#progress,
      tag: this.tag,
      dueDate: this.dueDate,
    };
  }
}
