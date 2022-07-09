/**
 * @typedef ProjectProps projectProps
 * @property {String} title project Title
 * @property {Checklist[]} [checklists] array of checklist instances
 * @property {Task[]} [tasks] array of task instances
 */
export class ProjectModel {
  /**
   * @param {ProjectProps} projectProps 
   */
  constructor(projectProps) {
    this.title = projectProps.title;
    this.checklists = projectProps.checklists;
    this.tasks = projectProps.title;
  }
}
