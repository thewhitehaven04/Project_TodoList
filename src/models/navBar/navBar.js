import { ProjectModel } from '../project/model';
import { PubSub } from '../../generic/pubSub';
import { projectEvents } from '../project/projectEvents';

export class NavBarModel {
  /**
   * @param {String[]} projects
   * @param {PubSub} publisher
   */
  constructor(projects, publisher) {
    this.projects = projects ?? [];
    this.publisher = publisher;
  }

  /**
   * @param {import('../project/model').ProjectProps} projectProps
   */
  addProject = (projectProps) => {
    this.projects.push(projectProps.title);
    this.publisher.pub(projectEvents.projectAdded, projectProps.title);
  };

  /**
   * @param {import('../project/model').ProjectProps} projectProps
   */
  removeProject = (projectProps) => {
    this.projects = this.projects.filter(
      (project) => project != projectProps.title,
    );
    this.publisher.pub(projectEvents.projectAdded, projectProps.title);
  };
}
