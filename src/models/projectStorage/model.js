import { ProjectModel } from "../project/model";

class ProjectStorage {
  /**
   * @param {ProjectModel[]} projects
   */
  constructor(projects) {
    this.projects = projects;
  }

  /**
   * @param {ProjectModel} project
   */
  addProject(project) {
    this.projects.push(project);
  }

  /**
   * @param {ProjectModel} projectTitle
   */
  deleteProject(projectTitle) {
    this.projects = this.projects.filter(
      (existingProject) => projectTitle !== existingProject.title,
    );
  }
}

const pStorage = new ProjectStorage([]);
export { pStorage };
