import { v4 as uuidv4 } from 'uuid';
import { ProjectModel } from '../project/model';

class ProjectStorage {
  constructor() {
    /**
     * @type {Map<String, import('../project/model').ProjectProps>}
     */
    this.projects = new Map(); 
  }
  /**
   * @param {import('../project/model').ProjectProps} projectProps
   */
  addProject(projectProps) {
    this.projects.set(uuidv4(), projectProps);
  }
  /**
   * @param {import('../project/model').ProjectProps} projectProps
   */
  deleteProject(projectProps) {
    this.projects.
  }

  updateProject(projectProps) {
    const foundProject = new ProjectModel(
      this.projects.find(
        (existingProject) => existingProject.title === projectProps.title,
      ),
    );

    // try this out
    foundProject = this.projects.find(
  }

  /**
   * @param {import('../project/model').ProjectProps} projectProps
   * @returns {ProjectModel}
   */
  getProject(projectProps) {
    return this.projects.find(
      (project) => project.title === projectProps.title,
    );
  }
}

export { ProjectStorage };
