import { CreateNewProjectWidgetView } from './createNewProjectView';
import { PubSub } from '../../../../generic/pubSub';
import { projectEvents } from '../../../../models/project/projectEvents';

/**
 * Project creation widget controller
 */
export class CreateNewProjectWidgetController {
  /**
   * @param {CreateNewProjectWidgetView} view
   * @param {PubSub} newProjectPubSub
   */
  constructor(view, newProjectPubSub) {
    this.view = view;

    this.view._bindNewProjectHandler(this, this.publishNewProjectCreation);
    this.newProjectPubSub = newProjectPubSub;
  }

  publishNewProjectCreation = (projectTitle) => {
    this.newProjectPubSub.pub(projectEvents.projectAdded.getName(), { title: projectTitle });
  };

  render() {
    return this.view.render();
  }
}
