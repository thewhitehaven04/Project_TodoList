import { getTask } from '../../../..';
import { PubSub } from '../../../../generic/pubSub';
import { ChecklistModel } from '../../../../models/checklist/model';
import { PrioritiesModel } from '../../../../models/priority/model';
import { ProjectModel } from '../../../../models/project/model';
import { projectEvents } from '../../../../models/project/projectEvents';
import { TaskModel } from '../../../../models/task/model';
import { taskEvents } from '../../../../models/task/taskEvents';
import { ChecklistController } from '../createNewChecklist/controller/checklistController';
import { ChecklistCreateView, ChecklistView } from '../createNewChecklist/views/createNewChecklistView';
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
    this.view.displayCreateChecklistWidget =
      this.view.displayCreateChecklistWidget.bind(
        this,
        this.displayChecklistCreateWidget,
      );
    this.view.displayUpdateChecklistWidget =
      this.view.displayUpdateChecklistWidget.bind(
        this,
        this.displayChecklistUpdateWidget,
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
      new TaskModel(),
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

  displayChecklistCreateWidget = () => {
    return new ChecklistController(
      new ChecklistModel(),
      new ChecklistCreateView(),
      this.eventBus,
    ).render();
  };

  // displayChecklistUpdateWidget = () => {
  //   return new ChecklistController(new Chec);
  // };

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
