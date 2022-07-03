/**
 * @classdesc {ProjectStorage}
 * @method {addProject}
 * @method {deleteProject}
 */
class ProjectStorage {
  /**
   * @param {ProjectModel[]} projects
   */
  constructor(projects) {
    this.projects = projects;
  }

  /**
   * @param {Project} project
   */
  addProject(project) {
    this.projects.push(project);
  }

  /**
   * @param {Project} project
   */
  deleteProject(projectTitle) {
    this.projects = this.projects.filter(
      (existingProject) => projectTitle !== existingProject.title,
    );
  }
}

const pStorage = new ProjectStorage();
export { pStorage };
