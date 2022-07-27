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
      this.projects = new Map(Object.entries(localStorageData));
    } else {
      this.projects = new Map(
        projects.map((project) => [project.title, project]),
      );
    }
  }
  /**
   * @param {import('../project/model').ProjectProps} projectProps
   */
  addProject(projectProps) {
    this.projects.set(projectProps.title, projectProps);
  }
  /**
   * @param {import('../project/model').ProjectProps} projectProps
   */
  deleteProject(projectProps) {
    this.projects.delete(projectProps.title);
  }

  /**
   * @param {import('../project/model').ProjectProps} projectProps
   */
  updateProject(projectProps) {
    this.projects.set(projectProps.title, projectProps);
  }

  /**
   * @param {import('../project/model').ProjectProps} projectProps
   * @returns {(import('../project/model').ProjectProps | undefined)} props
   */
  getProject(projectProps) {
    return this.projects.get(projectProps.title);
  }

  /** Stores project to the client's local storage */
  #storeToLocalStorage() {
    this.#lsa.updateLocalStorage(this.toJSON());
  }

  #getFromLocalStorage() {
    return this.#lsa.getFromLocalStorage();
  }

  toJSON() {
    return {
      projects: Object.freeze(Object.entries(this.projects)),
    };
  }
}

export { ProjectStorage };
