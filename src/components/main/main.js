import { MainView } from './view/main';
import { PubSub } from '../../generic/pubSub';
import { appEvents } from '../../models/main/appEvents';
import { CreateNewProjectWidgetController } from './widgets/createNewProjectWidgetController';
import { CreateNewProjectWidgetView } from './widgets/view/createNewProjectView';
import { ProjectViewController } from './widgets/existingProjectWidgetController';
import { ProjectView } from './widgets/view/existingProjectView';

export class MainController {
  /**
   * Initialize main pane controller
   * @param {MainView} view view instance
   * @param {PubSub} eventBus app event bus that handles communication between app modules
   * */
  constructor(view, eventBus) {
    this.view = view;
    this.appEventBus = eventBus;
    this.appEventBus.subscribe(appEvents.openNewProjectForm, this.openNewProjectWidget);
  }

  /** Calls the view to display the new project creation widget */
  openNewProjectWidget = () => {
    this.view.setWidget(
      new CreateNewProjectWidgetController(new CreateNewProjectWidgetView(), this.appEventBus),
    );
    this.render();
  };

  /**
   * @param {import('../../models/project/model').ProjectProps} projectProps
   */
  openProjectViewWidget = (projectProps) => {
    this.view.setWidget(new ProjectViewController(new ProjectView(projectProps)));
    this.view.render();
  };

  /** Renders the main pane */
  render() {
    return this.view.render();
  }
}
