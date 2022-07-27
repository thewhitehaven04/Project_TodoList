/**
 * @typedef ProjectProps projectProps
 * @property {String} title project Title
 * @property {import('../checklist/model').ChecklistProps[]} checklists array of checklist instances
 * @property {import('../task/model').TaskProps[]} tasks array of task instances
 */

import { PublisherModel } from '../../generic/modelPublisher';
import { projectEvents } from './projectEvents';

export class ProjectModel extends PublisherModel {
  /**
   * @param {ProjectProps} projectProps
   */
  constructor(projectProps = { title: '', checklists: [], tasks: [] }) {
    super();
    this.update(projectProps);
  }

  /**
   * @param {ProjectProps} projectProps
   */
  update(projectProps) {
    this.title = projectProps.title;
    this.checklists = projectProps.checklists;
    this.tasks = projectProps.tasks;
  }

  /**
   * Add a checklist to the model.
   * @param {import('../checklist/model').ChecklistProps} checklistProps
   */
  addChecklist = (checklistProps) => {
    this.checklists.push(checklistProps);
    this.publish(projectEvents.checklistAddedToProject, checklistProps);
  };

  /**
   * Add a task to the model
   * @param {import('../task/model').TaskProps} taskProps
   */
  addTask = (taskProps) => {
    this.tasks.push(taskProps);
    this.publish(projectEvents.taskAddedToProject, taskProps);
  };

  removeChecklist = (checklistProps) => {
    this.checklists = this.checklists.filter(
      (existingChecklist) => existingChecklist !== checklistProps,
    );
    this.publish(projectEvents.checklistAddedToProject, checklistProps);
  };

  /**
   * @returns {ProjectProps} projectProps
   */
  toJSON() {
    return {
      title: this.title,
      checklists: Array.from(this.checklists),
      tasks: Array.from(this.tasks),
    };
  }
}
