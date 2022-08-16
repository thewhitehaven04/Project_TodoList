import { LocalStorageAdapter } from '../../generic/storage';

class ProjectStorage {
  #storageKey = 'projectDto';
  #lsa;

  /**
   * @param {import('../project/model').ProjectProps[]} projects
   */
  constructor(projects = []) {
    this.#lsa = new LocalStorageAdapter(this.#storageKey);

    const localStorageData = this.#getFromLocalStorage();

    if (localStorageData !== null) {
      this.projects = localStorageData;
    } else {
      this.projects = Object.fromEntries(
        projects.map((project) => [project.title, project]),
      );
    }
  }
  /**
   * @param {import('../project/model').ProjectProps} projectProps
   */
  addProject(projectProps) {
    this.projects[projectProps.title] = projectProps;
    this.#storeToLocalStorage();
  }
  /**
   * @param {import('../project/model').ProjectProps} projectProps
   */
  deleteProject(projectProps) {
    delete this.projects[projectProps.title];
    this.#storeToLocalStorage();
  }

  /**
   * @param {import('../project/model').ProjectProps} projectProps
   */
  updateProject(projectProps) {
    this.projects[projectProps.title] = projectProps;
    this.#storeToLocalStorage();
  }

  /**
   * @param {import('../project/model').ProjectProps} projectProps
   * @returns {(import('../project/model').ProjectProps | undefined)} props
   */
  getProject(projectProps) {
    return this.projects[projectProps.title];
  }

  /** Stores project to the client's local storage */
  #storeToLocalStorage() {
    this.#lsa.updateLocalStorage(this.toJSON());
  }

  #getFromLocalStorage() {
    return this.#lsa.getFromLocalStorage();
  }

  toJSON() {
    return this.projects;
  }
}

export { ProjectStorage };
