import { PubSub } from '../../generic/pubSub';
import { projectEvents } from '../project/projectEvents';
import { ProjectStorage } from './projectStorage';
import { ProjectProps } from '../project/model';

export class ProjectStoragePubSub {
  /**
   * @param {ProjectProps[]} projectPropsArr
   * @param {PubSub} eventBus
   * @param {LocalStorageAdapter} localStorageAdapter 
   */
  constructor(projectPropsArr, eventBus, localStorageAdapter) {
    this.projectStorage = new ProjectStorage();
    this.lsa = localStorageAdapter;


    this.eventBus = eventBus;
    this.eventBus.subscribe(projectEvents.projectAdded, this.addProject);
    this.eventBus.subscribe(projectEvents.projectRemoved, this.deleteProject);

    projectPropsArr.forEach((projectProps) => this.addProject(projectProps));
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


  updateProject = (projectProps) => {
    this.projectStorage.(projectProps);
  }
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
    return this.projectStorage.projects.map((project) => project);
  };
}
