import { ProjectModel } from '../project/model';
import { PubSub } from '../../generic/pubSub';
import { events } from './navBarEvents';

export class NavBarModel {
  /**
   * @param {ProjectStorage} projectStorage
   * @param {PubSub} publisher
   */

  constructor(projectStorage, publisher) {
    this.projectStorage = projectStorage;
    this.publisher = publisher;
  }

  /**
   * @param {String} project
   */
  addProject(project) {
    this.projectStorage.addProject(new ProjectModel(project));
    this.publisher.pub(events.projectRemoved, project);
  }

  /**
   * @param {String} projectTitle
   */
  removeProject(projectTitle) {
    this.projectStorage.removeProject(projectTitle);
    this.publisher.pub(events.projectAdded, projectTitle);
  }
}
