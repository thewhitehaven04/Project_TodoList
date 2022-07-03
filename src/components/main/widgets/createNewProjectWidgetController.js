import { CreateNewProjectWidgetView } from './view/createNewProjectView';
import { PubSub } from './../../../generic/pubSub';

/**
 * Project creation widget controller
 */
export class CreateNewProjectWidgetController {
  /**
   *
   * @param {CreateNewProjectWidgetView} view
   * @param {PubSub} newProjectPubSub
   */
  constructor(view, newProjectPubSub) {
    this.view = view;
    this.newProjectPubSub = newProjectPubSub;
  }

  publishNewProject() {
    this.newProjectPubSub.pub();
  }

  render() {
    this.view.render();
  }
}
