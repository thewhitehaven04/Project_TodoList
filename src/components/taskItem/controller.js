import { PubSub } from '../../generic/pubSub';
import { TaskItemModel } from './model/taskItem';

/**
 * @typedef TaskItemProps
 * @property {string} name task name
 * @property {string} description task description
 * @property {string} priority task priority
 * @property {string} progress an instance of progressModel
 * @property {string} tag task tag
 */

/**
 * @typedef TaskItemInstance
 * @property {Function} render renders the task item
 * @property {Function} update updates the TaskItem with given props
 */

export class TaskItemController {
  constructor(view, model, ps) {
    this.view = view;
    this.model = model;
    this.ps = ps;
  }

  /** Return an instance of taskItem
   *
   * @param {TaskItemProps} props
   * @returns {TaskItemInstance} task item instance 
   */
  getInstance(props) {
    const model = new this.model(props);
    const view = new this.view(JSON.stringify(model));

    const pubSub = new PubSub();
    pubSub.subscribe(view.update);

    return { render: view.render(), update: model.update() };
  }

  /** Update the model with the supplied props object
   * @param {TaskItemProps} props
   */
  update(props) {
    this.model.update(name, description, priority, dueDate, tag);
  }

  complete() {
    this.model.progress();
  }
}

const p = new TaskItemController(TaskItemView, new TaskItemModel)