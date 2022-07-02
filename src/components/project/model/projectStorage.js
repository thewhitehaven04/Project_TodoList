import { PubSub } from '../../../generic/pubSub';

export class ProjectStorage {
  constructor() {
    this.projects = new Map();
  }

  /** Adds a new Project class instance to the project storage.
   * @param {Project} project project class instance
   */
  addProject(project) {
    const title = project.getTitle();
    if (!this.projects.has(title)) {
      this.projects.set(title, project);
    } else {
      throw new ReferenceError(`Project ${project.title} already exists`);
    }
  }

  getProject(title) {
    return this.projects.get(title);
  }

  /** Returns an array of all projects
   * @returns {Array} array that conains all proejcts
   */
  getAllProjects() {
    return this.projects.values();
  }

  /** Removes the project from the storage.
   * @param {Project} project
   */
  removeProject(project) {
    const title = project.getTitle();
    if (this.projects.has(title)) {
      this.projects.delete(title);
    } else {
      throw new ReferenceError(`Project ${project.title} does not exist.`);
    }
  }
}
