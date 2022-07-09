import { PubSub } from '../../generic/pubSub';
import { NavBarView } from './view/view';
import { NavBarModel } from '../../models/navBar/navBar';
import { events } from '../../models/navBar/navBarEvents';
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

    this.model = model;
    this.globalPs = globalPs;

    this.localPs = localPs;
    this.localPs.subscribe(events.projectRemoved, this.view.update);
    this.localPs.subscribe(events.projectAdded, this.view.update);
  }

  /** Publish an event to trigger opening of the new form creation widget. */
  openNewProjectForm = () => {
    this.globalPs.pub(appEvents.openNewProjectForm, null);
  };

  render() {
    return this.view.render();
  }
}
