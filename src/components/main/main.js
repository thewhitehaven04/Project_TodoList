import { MainView } from './view/main';
import { PubSub } from '../../generic/pubSub';
import { appEvents } from '../../models/main/appEvents';
import { CreateNewProjectWidgetController } from './widgets/createNewProjectWidget/createNewProjectController';
import { CreateNewProjectWidgetView } from './widgets/createNewProjectWidget/createNewProjectView';
import { ProjectViewController } from './widgets/projectWidget/projectController';
import { ProjectView } from './widgets/projectWidget/projectView';
import { ProjectModel } from '../../models/project/model';

export class MainController {
  /**
   * Initialize main pane controller
   * @param {MainView} view view instance
   * @param {PubSub} eventBus app event bus that handles communication between app modules
   * */
  constructor(view, eventBus) {
    this.view = view;
    this.appEventBus = eventBus;

    this.appEventBus.subscribe(
      appEvents.openNewProjectForm,
      this.openNewProjectWidget,
    );
    this.appEventBus.subscribe(
      appEvents.openProjectViewWidget,
      this.openProjectViewWidget,
    );
  }

  /** Calls the view to display the new project creation widget */
  openNewProjectWidget = () => {
    this.view.setWidget(
      new CreateNewProjectWidgetController(
        new ProjectModel(),
        new CreateNewProjectWidgetView(),
        this.appEventBus,
      ),
    );
    this.render();
  };

  /**
   * @param {import('../../models/project/model').ProjectProps} projectProps
   */
  openProjectViewWidget = (projectProps) => {
    this.view.setWidget(
      new ProjectViewController(
        new ProjectModel(projectProps),
        new ProjectView(projectProps),
        this.appEventBus,
      ),
    );
    this.view.render();
  };

  /** Renders the main pane */
  render() {
    return this.view.render();
  }
}
