import { ProjectModel } from '../project/model';

class ProjectStorage {
  constructor() {
    /**
     * @type {ProjectModel[]}
     */
    this.projects = [];
  }
  /**
   * @param {import('../project/model').ProjectProps} projectProps
   */
  addProject(projectProps) {
    this.projects.push(new ProjectModel(projectProps));
  }
  /**
   * @param {import('../project/model').ProjectProps} projectProps
   */
  deleteProject(projectProps) {
    this.projects = this.projects.filter(
      (existingProject) => projectProps.title !== existingProject.title,
    );
  }

  /**
   * @param {import('../project/model').ProjectProps} projectProps
   * @returns
   */
  getProject(projectProps) {
    return this.projects.find((project) => project.title === projectProps.title) ?? projectProps;
  }
}

export { ProjectStorage };
