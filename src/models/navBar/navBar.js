import { ProjectModel } from '../project/model';
import { PubSub } from '../../generic/pubSub';
import { ProjectAddedEvent, ProjectRemovedEvent } from './events';

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
    this.publisher.pub(new ProjectRemovedEvent(project));
  }

  /**
   * @param {String} projectTitle
   */
  removeProject(projectTitle) {
    this.projectStorage.removeProject(projectTitle);
    this.publisher.pub(new ProjectAddedEvent(projectTitle));
  }
}
