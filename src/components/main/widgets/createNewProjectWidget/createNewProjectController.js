import { CreateNewProjectWidgetView } from './createNewProjectView';
import { PubSub } from '../../../../generic/pubSub';
import { projectEvents } from '../../../../models/project/projectEvents';
import { ProjectModel } from '../../../../models/project/model';

/**
 * Project creation widget controller
 */
export class CreateNewProjectWidgetController {
  /**
   * @param {ProjectModel} model project model
   * @param {CreateNewProjectWidgetView} view project creation widget
   * @param {PubSub} eventBus global event bus
   */
  constructor(model, view, eventBus) {
    this.model = model;
    this.view = view;

    this.view._bindNewProjectHandler(this, this.publishNewProjectCreation);
    this.eventBus = eventBus;
  }

  publishNewProjectCreation = (projectTitle) => {
    this.model.update({ title: projectTitle, checklists: [], tasks: [] });
    this.eventBus.pub(projectEvents.projectAdded, this.model.toJSON());
  };

  render() {
    return this.view.render();
  }
}
