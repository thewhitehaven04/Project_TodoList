import { TaskItem as Model } from './model/taskItem';
import { TaskItem as View } from './view/taskItem';
import { PubSub } from './../../generic/observer';

export class TaskItemController {
  constructor() {
    this.view = View;
    this.model = Model;
  }

  getTaskItem(name, description, priority, dueDate, tag) {
    const model = new this.model(name, description, priority, dueDate, tag);
    const view = new this.view(name, description, priority, progress, dueDate, tag);

    const pubSub = new PubSub();
    pubSub.subscribe(view.update);

    return { render: view.render(), update: model.update() };
  }

  update({ name, description, priority, dueDate, tag }) {
    this.model.update(name, description, priority, dueDate, tag);
  }
}
