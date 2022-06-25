export class NavBarModel {
  constructor(projects) {
    this.projects = new Map();
    for (let projectName of projects.keys()) {
      this.projects.set(projectName, projects[projectName]);
    }
  }

  getProject(projectName) {
    return this.projects.get(projectName);
  }
}
