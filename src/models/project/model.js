/**
 * @typedef ProjectProps projectProps
 * @property {String} title project Title
 * @property {Checklist[]} [checklists] array of checklist instances
 * @property {Task[]} [tasks] array of task instances
 */

import { PublisherModel } from '../../generic/modelPublisher';
import { PubSub } from '../../generic/pubSub';
import { taskEvents } from '../task/taskEvents';
import { projectEvents } from './projectEvents';

export class ProjectModel extends PublisherModel {
  /**
   * @param {ProjectProps} projectProps
   */
  constructor(projectProps) {
    super();
    this.title = projectProps.title;
    this.checklists = projectProps.checklists ?? [];
    this.tasks = projectProps.tasks ?? [];
  }

  /**
   * @param {Checklist} checklist
   */
  addChecklist = (checklist) => {
    this.checklists.push(checklist);
  };

  /**
   * @param {TaskProps} taskProps
   */
  addTask = (taskProps) => {
    this.tasks.push(taskProps);
    this.publish(projectEvents.taskAddedToProject.getName(), taskProps);
  };

  /**
   * @returns {ProjectProps} projectProps
   */
  toJSON() {
    return {
      title: this.title,
      checklists: this.checklists,
      tasks: this.tasks,
    };
  }
}
