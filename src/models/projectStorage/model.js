import { PubSub } from '../../generic/pubSub';
import { ProjectModel } from '../project/model';
import { projectEvents } from '../project/projectEvents';

class ProjectStorage {
  /**
   * @param {ProjectModel[]} projects
   * @param {PubSub} eventBus
   */
  constructor(projects, eventBus) {
    this.projects = projects;
    this.eventBus = eventBus;

    this.eventBus.subscribe(projectEvents.projectAdded().getName(), this.addProject);
    this.eventBus.subscribe(projectEvents.projectRemoved().getName(), this.deleteProject);
  }

  /**
   * @param {import('../project/model').ProjectProps} projectProps
   */
  addProject = (projectProps) => {
    this.projects.push(new ProjectModel(projectProps));
    this.eventBus.pub(projectEvents.projectAddedToStorage().getName(), projectProps);
  };

  /**
   * @param {import('../project/model').ProjectProps} projectProps
   */
  deleteProject = (projectProps) => {
    this.projects = this.projects.filter(
      (existingProject) => projectProps.title !== existingProject.title,
    );
    this.eventBus.pub(projectEvents.projectRemovedFromStorage().getName(), projectProps);
  };

  getProjects() {
    return this.projects;
  }
}

export { ProjectStorage };
