import { PubSub } from '../../generic/pubSub';
import { Project } from '../project/model/project';
import { NavBarModel } from './model/model';
import { NavBarView } from './view/view';

class NavBarController {
  /**
   * @param {NavBarView} view
   * @param {NavBarModel} model
   * @param {PubSub} ps publisher/subscriber object
   */
  constructor(view, model, ps) {
    this.view = view;
    this.model = model;

    ps.subscribe(this.view.update);
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

const ps = new PubSub();
const navBar = new NavBarController(new NavBarView(), new NavBarModel(ps.pub), ps);

navBar.addProject(new Project('Kek'), []);
navBar.addProject(new Project('Test'), []);
console.dir(navBar);

export { navBar };
