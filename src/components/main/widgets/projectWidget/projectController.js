import { getTask } from '../../../..';
import { PubSub } from '../../../../generic/pubSub';
import { checklistEvents } from '../../../../models/checklist/checklistEvents';
import { ChecklistModel } from '../../../../models/checklist/model';
import { prioritiesModel } from '../../../../models/priority/model';
import { ProjectModel } from '../../../../models/project/model';
import { projectEvents } from '../../../../models/project/projectEvents';
import { TaskModel } from '../../../../models/task/model';
import { taskEvents } from '../../../../models/task/taskEvents';
import { ChecklistController } from '../checklistWidget/controller/checklistController';
import { ChecklistUpdateView } from '../checklistWidget/views/update/checklistUpdateView';
import { ChecklistCreateView } from '../checklistWidget/views/create/createNewChecklistView';
import { TaskController } from '../taskWidget/controller/taskController';
import { CreateTaskWidgetView } from '../taskWidget/views/create/createTaskWidgetView';
import { UpdateTaskView } from '../taskWidget/views/update/updateTaskView';
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

    /** Catch project removed event and close the view if the project received
     * is the same as the one being displayed. */
    this.eventBus.subscribe(projectEvents.projectRemovedFromStorage, this.hide);

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
      new CreateTaskWidgetView(prioritiesModel),
      new TaskModel(),
      this.eventBus,
    ).render();
  };

  /**
   * @param {import('../../../../models/task/model').TaskProps} taskProps
   */
  displayTaskUpdateWidget = (taskProps) => {
    return new TaskController(
      new UpdateTaskView(taskProps),
      new TaskModel(taskProps),
      this.eventBus,
    ).render();
  };

  displayChecklistCreateWidget = () => {
    return new ChecklistController(new ChecklistModel(), this.eventBus)
      .setCreateView(new ChecklistCreateView())
      .render();
  };

  /**
   * @param {import('../../../../models/checklist/model').ChecklistProps} checklistProps
   */
  displayChecklistUpdateWidget = (checklistProps) => {
    return new ChecklistController(
      new ChecklistModel(checklistProps),
      this.eventBus,
    )
      .setUpdateView(new ChecklistUpdateView(checklistProps))
      .render();
  };

  addChecklist = (checklistProps) => {
    this.model.addChecklist(checklistProps);
  };

  removeChecklist = (checklistProps) => {
    this.model.removeChecklist(checklistProps);
  };

  addTask = (taskProps) => {
    this.model.addTask(getTask(taskProps));
  };

  render() {
    return this.view.render();
  }

  /**
   * @param {import('../../../../models/project/model').ProjectProps} props
   */
  hide = (props) => {
    console.log(`Project to hide: ${JSON.stringify(props)}`);
    if (props.title === this.model.toJSON().title) {
      this.view.hide();
    }
  };
}
