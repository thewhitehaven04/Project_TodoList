import { TaskModel, TaskProps } from '../../../../../models/task/model';
import { taskEvents } from '../../../../../models/task/taskEvents';
import { CreateTaskWidgetView } from './../views/create/createTaskWidgetView';
import { UpdateTaskView } from '../../taskWidget/views/update/updateTaskView';
import { PubSub } from '../../../../../generic/pubSub';
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
    this.eventBus.pub(taskEvents.taskCreationEvent, taskProps);
  };

  updateTask = (taskProps) => {
    this.eventBus.pub(taskEvents.taskUpdateEvent, taskProps);
  };

  render() {
    return this.view.render();
  }

  close() {
    return this.view.hide();
  }
}
