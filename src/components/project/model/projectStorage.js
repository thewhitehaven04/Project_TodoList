export class ProjectStorage {
  #projects;

  constructor() {
    this.#projects = {};
  }

  #containsTitle(title) {
    return Object.keys(this.#projects).includes(title);
  }

  /** Adds a new Projet class instance to the project storage.
   * @param {Project} project - project class instance
   */
  addProject(project) {
    const title = project.getTitle();
    if (!this.#containsTitle(title)) {
      this.#projects[title] = project;
    } else {
      throw new ReferenceError(`Project ${project.title} already exists`);
    }
  }

  getProject(title) {
    return this.#projects[title];
  }

  /** Returns an array of all projects
   * @returns {Array} array that conains all proejcts
   */
  getAllProjects() {
    return Object.values(this.#projects);
  }

  removeProject(project) {
    const title = project.getTitle();
    if (this.#containsTitle(title)) {
      delete this.#projects[title];
    } else {
      throw new ReferenceError(`Project ${project.title} does not exist.`);
    }
  }
}
