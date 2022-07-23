import { getTask } from '../../../..';
import { PubSub } from '../../../../generic/pubSub';
import { checklistEvents } from '../../../../models/checklist/checklistEvents';
import { ChecklistModel } from '../../../../models/checklist/model';
import { PrioritiesModel } from '../../../../models/priority/model';
import { ProjectModel } from '../../../../models/project/model';
import { projectEvents } from '../../../../models/project/projectEvents';
import { TaskModel } from '../../../../models/task/model';
import { taskEvents } from '../../../../models/task/taskEvents';
import { ChecklistController } from '../createNewChecklist/controller/checklistController';
import { ChecklistUpdateView } from '../createNewChecklist/views/update/checklistUpdateView';
import { ChecklistCreateView } from '../createNewChecklist/views/create/createNewChecklistView';
import { TaskController } from '../createTaskWidget/createTaskWidgetController';
import { CreateTaskWidgetView } from '../createTaskWidget/createTaskWidgetView';
import { EditTaskView } from '../editTaskWidget/taskView';
import { ProjectView } from './projectView';

export class ProjectViewController {
  /**
   * @param {ProjectView} view
   * @param {ProjectModel} model
   */
  constructor(model, view, eventBus) {
    this.model = model;
    this.view = view;

    this.eventBus = eventBus;

    /** Display added tasks and checklists after they are succesfully added to storage */
    this.eventBus.subscribe(
      taskEvents.taskAddedToStorage.getName(),
      this.addTask,
    );
    this.eventBus.subscribe(
      checklistEvents.checklistAddedToStorage,
      this.addChecklist,
    );

    /** The following binds view event listeners to controller handlers */
    this.view.displayTaskCreateWidget = this.view.displayTaskCreateWidget.bind(
      this,
      this.displayTaskCreateWidget,
    );
    this.view.displayTaskUpdateWidget = this.view.displayTaskUpdateWidget.bind(
      this,
      this.displayTaskUpdateWidget,
    );
    this.view.displayChecklistCreateWidget =
      this.view.displayChecklistCreateWidget.bind(
        this,
        this.displayChecklistCreateWidget,
      );
    this.view.displayChecklistUpdateWidget =
      this.view.displayChecklistUpdateWidget.bind(
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
    this.localEventBus.subscribe(
      projectEvents.checklistAddedToProject,
      this.view.addChecklist,
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

  /**
   * @param {import('../../../../models/checklist/model').ChecklistProps} checklistProps
   */
  displayChecklistUpdateWidget = (checklistProps) => {
    return new ChecklistController(
      new ChecklistModel(checklistProps),
      new ChecklistUpdateView(checklistProps),
      this.eventBus,
    ).render();
  };

  addChecklist = (checklistProps) => {
    this.model.addChecklist(checklistProps);
  };

  addTask = (taskProps) => {
    this.model.addTask(getTask(taskProps));
  };

  render() {
    return this.view.render();
  }
}
