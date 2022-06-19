class ProjectStorage {
  #projects;

  constructor() {
    this.#projects = {};
  }

  #containsTitle(title) {
    return !!this.#projects.keys.find(projectTitle => projectTitle === title);
  }

  /** Adds a new Projet class instance to the project storage. 
   * @param {Project} project - project class instance
  */
  addProject(project) {
    const title = project.getTitle();
    if (this.#containsTitle(title)) {
      this.#projects[title] = project;
    }
  }

  getProject(title) {
    return this.#projects[title];
  }
}


export { ProjectStorage };
