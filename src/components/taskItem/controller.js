import { TaskItem as Model } from './model/taskItem';
import { TaskItem as View } from './view/taskItem';
import { PubSub } from './../../generic/observer';

export class TaskItemController {
  constructor() {
    this.view = View;
    this.model = Model;
  }

  /** Return an instance of taskItem
   *
   * @param {String} name
   * @param {String} description
   * @param {String} priority
   * @param {String} dueDate
   * @param {String} tag
   * @returns 
   */
  getTaskItem(name, description, priority, dueDate, tag) {
    const model = new this.model(name, description, priority, dueDate, tag);
    const view = new this.view(model.get());

    const pubSub = new PubSub();
    pubSub.subscribe(view.update);

    return { render: view.render(), update: model.update() };
  }

  update({ name, description, priority, dueDate, tag }) {
    this.model.update(name, description, priority, dueDate, tag);
  }
}
