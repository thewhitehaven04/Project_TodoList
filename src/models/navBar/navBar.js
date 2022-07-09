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
   * @param {import('../project/model').ProjectProps} projectProps 
   */
  addProject = (projectProps) => {
    this.projectStorage.addProject(new ProjectModel(projectProps));
    this.publisher.pub(events.projectRemoved, projectProps.title);
  }

  /**
   * @param {import('../project/model').ProjectProps} projectProps 
   */
  removeProject = (projectProps) => {
    this.projectStorage.removeProject(projectProps.title);
    this.publisher.pub(events.projectAdded, projectProps.title);
  }
}
