import { PubSub } from '../../../generic/pubSub';
import { NavBarView } from '../view/view';
import { NavBarModel } from '../../../models/navBar/navBar';
import { projectEvents } from '../../../models/project/projectEvents';
import { appEvents } from '../../../models/main/appEvents';
import { CreateNewProjectWidgetController } from '../../main/widgets/createNewProjectWidget/createNewProjectController';
import { ProjectModel } from '../../../models/project/model';
import { CreateNewProjectWidgetView } from '../../main/widgets/createNewProjectWidget/createNewProjectView';

export class NavBarController {
  /**
   * @param {NavBarView} view handles rendering of the navbar
   * @param {NavBarModel} model handles business logic of the navbar
   * @param {PubSub} globalPs pubSub instance that handles events being published by the controller
   * for other application objects (e.g. main pane)
   */
  constructor(model, view, globalPs) {
    this.model = model;
    this.localPs = new PubSub();
    this.model.add(this.localPs);

    this.globalPs = globalPs;
    this.view = view;
    this.view._bindHandleOpenProjectForm(this, this.openNewProjectForm);
    this.view._bindHandleProjectRemoval(this, this.removeProject);
    this.view._bindOpenExistingProjectHandler(this, this.openProjectWidget);

    // the model is subscribed to the events from the project storage so that the projects
    // are not removed from the view before they are actually removed from the storage.
    this.globalPs.subscribe(
      projectEvents.projectAddedToStorage,
      this.model.addProject,
    );
    this.globalPs.subscribe(
      projectEvents.projectRemovedFromStorage,
      this.model.removeProject,
    );

    // projects are removed from the view after the model has received confirmation
    this.localPs.subscribe(
      projectEvents.projectRemoved,
      this.view.removeProject,
    );
    this.localPs.subscribe(projectEvents.projectAdded, this.view.addProject);
  }

  /** Publish an event to trigger opening of the new form creation widget. */
  openNewProjectForm = () => {
    return new CreateNewProjectWidgetController(
      new ProjectModel(),
      new CreateNewProjectWidgetView(),
      this.globalPs,
    ).render();
  };

  /**
   * @param {import('../../../models/project/model').ProjectProps} props
   */
  removeProject = (props) => {
    this.globalPs.pub(projectEvents.projectRemoved, props);
  };

  openProjectWidget = (projectProps) => {
    this.globalPs.pub(appEvents.openProjectViewWidget, projectProps);
  };

  render() {
    return this.view.render();
  }
}
