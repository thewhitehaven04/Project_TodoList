import { getTask } from '../../../..';
import { PubSub } from '../../../../generic/pubSub';
import { PrioritiesModel } from '../../../../models/priority/model';
import { ProjectModel } from '../../../../models/project/model';
import { projectEvents } from '../../../../models/project/projectEvents';
import { TaskModel } from '../../../../models/task/model';
import { taskEvents } from '../../../../models/task/taskEvents';
import { TaskController } from '../createTaskWidget/createTaskWidgetController';
import { CreateTaskWidgetView } from '../createTaskWidget/createTaskWidgetView';
import { EditTaskView } from '../editTaskWidget.js/taskView';
import { ProjectView } from './existingProjectView';

export class ProjectViewController {
  /**
   * @param {ProjectView} view
   * @param {ProjectModel} model
   */
  constructor(model, view, eventBus) {
    this.model = model;
    this.view = view;

    this.eventBus = eventBus;
    this.eventBus.subscribe(
      taskEvents.taskAddedToStorage.getName(),
      this.addTask,
    );

    this.view.displayTaskCreateWidget = this.view.displayTaskCreateWidget.bind(
      this,
      this.displayTaskCreateWidget,
    );
    this.view.displayTaskUpdateWidget = this.view.displayTaskUpdateWidget.bind(
      this,
      this.displayTaskUpdateWidget,
    );

    /** This is a local event bus for events  */
    this.localEventBus = new PubSub();
    this.model.add(this.localEventBus);
    this.localEventBus.subscribe(
      projectEvents.taskAddedToProject.getName(),
      this.view.addTask,
    );
  }

  displayTaskCreateWidget = () => {
    return new TaskController(
      new CreateTaskWidgetView(PrioritiesModel),
      new TaskModel({}),
      this.eventBus,
    ).render();
  };

  displayTaskUpdateWidget = (taskProps) => {
    return new TaskController(
      new EditTaskView(taskProps),
      new TaskModel(taskProps),
      this.eventBus,
    ).render();
  };

  addChecklist = (checklist) => {
    this.model.addChecklist(checklist);
  };

  addTask = (taskProps) => {
    this.model.addTask(getTask(taskProps));
  };

  render() {
    return this.view.render();
  }
}
