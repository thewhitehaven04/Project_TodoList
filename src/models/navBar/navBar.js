import { projectEvents } from '../project/projectEvents';
import { PublisherModel } from '../../generic/modelPublisher';

export class NavBarModel extends PublisherModel {
  /**
   * @param {import('../project/model').ProjectProps[]} projects
   */
  constructor(projects) {
    super();
    this.projects = projects ?? [];
  }

  /**
   * @param {import('../project/model').ProjectProps} projectProps
   */
  addProject = (projectProps) => {
    this.projects.push(projectProps);
    this.publish(projectEvents.projectAdded, projectProps);
  };

  /**
   * @param {import('../project/model').ProjectProps} projectProps
   */
  removeProject = (projectProps) => {
    this.projects = this.projects.filter(
      (project) => project.title != projectProps.title,
    );
    this.publish(projectEvents.projectRemoved, projectProps);
  };
}
