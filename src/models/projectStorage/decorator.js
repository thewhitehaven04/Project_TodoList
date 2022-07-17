import { PubSub } from '../../generic/pubSub';
import { projectEvents } from '../project/projectEvents';
import { ProjectStorage } from './model';
import { ProjectProps } from '../project/model';

export class ProjectStoragePublisher {
  /**
   * @param {ProjectProps[]} projectPropsArr
   * @param {PubSub} eventBus
   */
  constructor(projectPropsArr, eventBus) {
    this.projectStorage = new ProjectStorage();
    this.eventBus = eventBus;
    this.eventBus.subscribe(
      projectEvents.projectAdded.getName(),
      this.addProject,
    );
    this.eventBus.subscribe(
      projectEvents.projectRemoved.getName(),
      this.deleteProject,
    );

    projectPropsArr.forEach((projectProps) => this.addProject(projectProps));
  }

  /**
   * @param {ProjectProps} projectProps
   */
  addProject = (projectProps) => {
    this.projectStorage.addProject(projectProps);
    this.eventBus.pub(
      projectEvents.projectAddedToStorage.getName(),
      projectProps,
    );
  };

  /**
   * @param {ProjectProps} projectProps
   */
  deleteProject = (projectProps) => {
    this.projectStorage.deleteProject(projectProps);
    this.eventBus.pub(
      projectEvents.projectRemovedFromStorage.getName(),
      projectProps,
    );
  };

  /**
   * @param {ProjectProps} projectProps
   */
  getProject = (projectProps) => {
    return this.projectStorage.getProject(projectProps);
  };

  /**
   * @returns {ProjectProps[]} projectProps
   */
  getAllProjects = () => {
    return this.projectStorage.projects.map((project) => project.toJSON());
  };
}
