import { PubSub } from '../../generic/pubSub';
import { NavBarView } from './view/view';
import { NavBarModel } from '../../models/navBar/navBar';
import { projectEvents } from '../../models/project/projectEvents';
import { appEvents } from '../../models/main/appEvents';

export class NavBarController {
  /**
   * @param {NavBarView} view handles rendering of the navbar
   * @param {NavBarModel} model handles business logic of the navbar
   * @param {PubSub} localPs pubSub instance that handles events coming from the model into the view
   * @param {PubSub} globalPs pubSub instance that handles events being published by the controller
   * for other application objects (e.g. main pane)
   */
  constructor(view, model, localPs, globalPs) {
    this.view = view;
    this.view._bindHandleOpenProjectForm(this, this.openNewProjectForm);
    this.view._bindHandleProjectRemoval(this, this.removeProject);
    this.view._bindOpenExistingProjectHandler(this, this.openProjectWidget);

    this.model = model;
    this.globalPs = globalPs;

    // the model is subscribed to the events from the project storage so that the projects
    // are not removed from the view before they are actually removed from the storage.
    this.globalPs.subscribe(projectEvents.projectAddedToStorage.getName(), this.model.addProject);
    this.globalPs.subscribe(
      projectEvents.projectRemovedFromStorage.getName(),
      this.model.removeProject,
    );

    // projects are removed from the view after the model has received confirmation
    this.localPs = localPs;
    this.localPs.subscribe(projectEvents.projectRemoved.getName(), this.view.removeProject);
    this.localPs.subscribe(projectEvents.projectAdded.getName(), this.view.addProject);
  }

  /** Publish an event to trigger opening of the new form creation widget. */
  openNewProjectForm = () => {
    this.globalPs.pub(appEvents.openNewProjectForm);
  };

  removeProject = (projectTitle) => {
    this.globalPs.pub(
      projectEvents.projectRemoved.getName(),
      projectEvents.projectRemoved.setArgs(projectTitle),
    );
  };

  openProjectWidget = (projectTitle) => {
    this.globalPs.pub(
      appEvents.openProjectViewWidget.getName(),
      appEvents.openProjectViewWidget.setArgs(projectTitle),
    );
  };

  render() {
    return this.view.render();
  }
}
