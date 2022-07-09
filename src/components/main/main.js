import { MainView } from './view/main';
import { PubSub } from '../../generic/pubSub';
import { appEvents } from '../../models/main/appEvents';
import { CreateNewProjectWidgetController } from './widgets/createNewProjectWidgetController';
import { CreateNewProjectWidgetView } from './widgets/view/createNewProjectView';

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

  /** Calls the view to display the widget mapped to an event in the eventMapper
   * @param {Object} event
   */
  openNewProjectWidget = () => {
    this.view.updateWidget(
      new CreateNewProjectWidgetController(
        new CreateNewProjectWidgetView(),
        this.appEventBus,
      ).render(),
    );
    this.render();
  };

  /** Renders the main pane */
  render() {
    return this.view.render();
  }
}
