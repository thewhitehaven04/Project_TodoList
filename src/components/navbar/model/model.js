import { Project } from '../../project/model/project';

export class NavBarModel {
  /**
   * @param {Project[]} projects
   */
  constructor(publisherCallback) {
    this.projects = [];
    this.publisherCallback = publisherCallback;
  }

  #publishAddProjectEvent(project) {
    this.publisherCallback({
      type: 'projectAdded',
      args: project,
    });
  }

  /**
   * @param {Project} project
   */
  addProject(newProject) {
    this.projects.push(newProject.getTitle());
    this.#publishAddProjectEvent(newProject);
  }

  #publishRemoveProjectEvent(project) {
    this.publisherCallback({
      type: 'projectRemoved',
      args: project,
    });
  }

  /**
   * @param {Project} existingProject
   */
  removeProject(existingProject) {
    this.projects = this.projects.filter(
      (project) => project.getTitle() !== existingProject.getTitle(),
    );
    this.#publishRemoveProjectEvent(existingProject);
  }
}
