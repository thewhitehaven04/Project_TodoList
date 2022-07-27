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

import { PublisherModel } from '../../generic/modelPublisher';
import { progressModel } from '../progress/model';
import { taskEvents } from './taskEvents';

export class TaskModel extends PublisherModel {
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
    super();
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
    this.name = this.name || props.name;
    this.description = this.description || props.description;
    this.priority = this.priority || props.priority;
    this.tag = this.tag || props.tag;
    this.dueDate = this.dueDate || props.dueDate;

    this.publish(taskEvents.taskUpdateEvent, this.toJSON());
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
