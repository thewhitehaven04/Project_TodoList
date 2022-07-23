import { TaskModel, TaskProps } from '../../../../models/task/model';
import { taskEvents } from '../../../../models/task/taskEvents';
import { CreateTaskWidgetView } from './createTaskWidgetView';
import { PubSub } from './../../../../generic/pubSub';
import { EditTaskView } from '../editTaskWidget/taskView';
export class TaskController {
  /**
   * @param {(CreateTaskWidgetView | EditTaskView)} view
   * @param {TaskModel} model
   * @param {PubSub} eventBus
   */
  constructor(view, model, eventBus) {
    this.view = view;
    this.model = model;

    if (this.view._bindCreateTask !== undefined) {
      this.view._bindCreateTask(this.createTask);
    }

    if (this.view._bindUpdateTask !== undefined) {
      this.view._bindUpdateTask(this.updateTask);
    }

    this.eventBus = eventBus;
  }

  /**
   * @param {TaskProps} taskProps
   */
  createTask = (taskProps) => {
    this.eventBus.pub(taskEvents.taskCreationEvent.getName(), taskProps);
  };

  updateTask = (taskProps) => {
    this.eventBus.pub(taskEvents.taskUpdateEvent.getName(), taskProps);
  };

  render() {
    return this.view.render();
  }

  close() {
    return this.view.hide();
  }
}
