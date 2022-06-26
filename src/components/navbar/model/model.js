import { Project } from '../../project/model/project';
import { PubSub } from '../../../generic/observer';

export class NavBarModel {
  #publisher;

  /**
   * @param {Project[]} projects
   * @param {Function} publisher
   */
  constructor(publisher) {
    this.projects = [];
    this.#publisher = publisher;
  }

  #publishAddProjectEvent(project) {
    this.#publisher({
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
    this.#publisher({
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
