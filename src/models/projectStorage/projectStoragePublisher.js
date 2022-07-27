import { PubSub } from '../../generic/pubSub';
import { projectEvents } from '../project/projectEvents';
import { ProjectStorage } from './projectStorage';
import { ProjectProps } from '../project/model';

export class ProjectStoragePubSub {
  /**
   * @param {Object<String,ProjectProps[]>} projectPropsMap
   * @param {PubSub} eventBus
   */
  constructor(projectPropsMap, eventBus) {
    this.projectStorage = new ProjectStorage(projectPropsMap);

    this.eventBus = eventBus;
    this.eventBus.subscribe(projectEvents.projectAdded, this.addProject);
    this.eventBus.subscribe(projectEvents.projectRemoved, this.deleteProject);
    this.eventBus.subscribe(projectEvents.projectUpdated, this.updateProject);
  }

  /**
   * @param {ProjectProps} projectProps
   */
  addProject = (projectProps) => {
    this.projectStorage.addProject(projectProps);

    this.eventBus.pub(projectEvents.projectAddedToStorage, projectProps);
  };

  /**
   * @param {ProjectProps} projectProps
   */
  deleteProject = (projectProps) => {
    this.projectStorage.deleteProject(projectProps);
    this.eventBus.pub(projectEvents.projectRemovedFromStorage, projectProps);
  };

  /**
   * @param {ProjectProps} projectProps
   */
  updateProject = (projectProps) => {
    this.projectStorage.updateProject(projectProps);
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
    return Object.values(this.projectStorage.projects);
  };
}
