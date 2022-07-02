import { PubSub } from '../../generic/pubSub';
import { Project } from '../project/model/project';
import { NavBarModel } from '../../models/navBar/model';
import { NavBarView } from './view/view';

export class NavBarController {
  /**
   * @param {NavBarView} view
   * @param {NavBarModel} model
   * @param {PubSub} globalPs global publisher/subscriber object
   */
  constructor(view, model, projectsPs, eventsPs) {
    this.view = view;
    this.model = model;
    this.projectsPs = projectsPs;
    this.eventsPs = eventsPs;
  }

  /**
   * @param {Project[]} projects
   */
  addProjects(projects) {
    projects.forEach((project) => this.addProject(project));
  }

  #publish() {
    this.eventsPs.pub({
      type: 'projectAddWindowCalled',
    });
  }

  render() {
    return this.view.render();
  }
}
