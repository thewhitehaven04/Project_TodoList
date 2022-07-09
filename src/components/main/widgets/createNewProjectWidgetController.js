import { CreateNewProjectWidgetView } from './view/createNewProjectView';
import { PubSub } from './../../../generic/pubSub';
import { projectEvents } from '../../../models/project/projectEvents';

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

  
  publishNewProjectCreation = (projectProps) => {
    this.newProjectPubSub.pub(projectEvents.projectAdded, projectProps);
  }

  render() {
    return this.view.render();
  }
}
