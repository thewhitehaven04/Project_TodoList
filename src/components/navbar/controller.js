import { PubSub } from './../../generic/observer';
import { NavBarModel } from './model/model';
import { NavBarView } from './view/view';

class NavBarController {
  /**
   * @param {NavBarView} view
   * @param {NavBarModel} model
   */
  constructor(view, model) {
    this.pubSub = new PubSub();
    this.view = new view();
    this.model = new model(this.pubSub.pub.bind(this.pubSub));

    this.pubSub.subscribe(this.view.update);
  }

  /**
   * @param {Project[]} projects
   */
  addProjects(projects) {
    projects.forEach((project) => this.addProject(project));
  }

  /** Adds a project to the navbar */
  addProject(project) {
    this.model.addProject(project);
  }

  removeProject(project) {
    this.model.removeProject(project);
  }

  render() {
    return this.view.render();
  }
}

export const navBar = new NavBarController(NavBarView, NavBarModel);
