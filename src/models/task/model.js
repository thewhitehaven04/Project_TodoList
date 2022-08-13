/**
 * @typedef TaskProps
 * @type {Object}
 * @property {String} name task name
 * @property {String} description task description
 * @property {String} dueDate projected task completion date
 * @property {Boolean} [isOverdue] whether the task is overdue
 * @property {String} priority task priority
 * @property {String} progress an instance of progressModel
 * @property {String[]} tags task tag
 */
import formatISO from 'date-fns/formatISO';
import isPast from 'date-fns/isPast';
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
      tags: [],
    },
  ) {
    this.name = props.name;
    this.description = props.description;

    this.dueDate = new Date(props.dueDate);
    this.isOverdue = isPast(this.dueDate);

    this.priority = props.priority;
    this.#progress = progressModel.NOT_STARTED.name;
    this.tags = props.tags.map(tag => tag.toLowerCase());
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

    this.dueDate = new Date(props.dueDate);
    this.isOverdue = isPast(this.dueDate);

    this.priority = props.priority;
    this.tags = props.tags.map(tag => tag.toLowerCase());
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
      tags: Array.from(this.tags),
      dueDate: formatISO(
        this.dueDate,
        { representation: 'date' }
      ),
      isOverdue: this.isOverdue
    };
  }
}
