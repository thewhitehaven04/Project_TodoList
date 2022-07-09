import { ProjectModel } from "../project/model";

class ProjectStorage {
  /**
   * @param {ProjectModel[]} projects
   */
  constructor(projects) {
    this.projects = projects;
  }

  /**
   * @param {ProjectModel} projectModel
   */
  addProject(projectModel) {
    this.projects.push(projectModel);
  }

  /**
   * @param {ProjectModel} projectModel 
   */
  deleteProject(projectModel) {
    this.projects = this.projects.filter(
      (existingProject) => projectModel.title !== existingProject.title,
    );
  }
}

const pStorage = new ProjectStorage([]);
export { pStorage };
