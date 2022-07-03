export class ProjectModel {
  constructor(title, checklists = [], tasks = []) {
    this.title = title;
    this.checklists = checklists;
    this.tasks = tasks;
  }
}
