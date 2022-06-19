class ProjectStorage {
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
    }
    else {
      throw new ReferenceError(`Project ${project.title} already exists`)
    }
  }

  getProject(title) {
    return this.#projects[title];
  }

  removeProject(project) {
    const title = project.getTitle();
    if (this.#containsTitle(title)) {
      delete this.#projects[title];
    }
    else {
      throw new ReferenceError(`Project ${project.title} does not exist.`)
    }
  }
}


export { ProjectStorage };