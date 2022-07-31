import { TaskModel, TaskProps } from '../../../../../models/task/model';
import { taskEvents } from '../../../../../models/task/taskEvents';
import {
  CreateTaskView,
  CreateTaskWidgetView,
} from './../views/create/createTaskWidgetView';
import { PubSub } from '../../../../../generic/pubSub';
import { UpdateTaskView } from '../views/update/updateTaskView';
export class TaskController {
  /**
   * @param {TaskModel} model
   * @param {PubSub} eventBus
   */
  constructor(model, eventBus) {
    this.model = model;
    this.eventBus = eventBus;
  }

  /**
   * @param {CreateTaskView} view
   */
  setCreateView(view) {
    this.view = view;
    this.view._bindCreateTask(this.createTask);
    return this;
  }

  /**
   * @param {UpdateTaskView} view
   */
  setUpdateView(view) {
    this.view = view;
    this.view._bindUpdateTask(this.updateTask);
    return this;
  }

  /**
   * @param {TaskProps} taskProps
   */
  createTask = (taskProps) => {
    this.eventBus.pub(taskEvents.taskCreationEvent, taskProps);
  };

  /**
   * @param {TaskProps} taskProps
   */
  updateTask = (taskProps) => {
    this.model.update(taskProps);
    this.eventBus.pub(taskEvents.taskUpdateEvent, taskProps);
  };

  render() {
    return this.view.render();
  }

  close() {
    return this.view.hide();
  }
}
