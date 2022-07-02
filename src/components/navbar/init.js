import { NavBarController } from './controller';
import { PubSub } from '../../generic/pubSub';
import { NavBarView } from './view/view';
import { NavBarModel } from '../../models/navBar/model';

/** Initializes navBar with a given array of projects.
 *
 * @param {Project[]} projects
 * @returns {NavBarController} navbar
 */
export function initalizeNavBar(projects, projectChangesPublisher) {
  const ps = new PubSub();
  const view = new NavBarView();
  const navBar = NavBarController(view, new NavBarModel(ps.pub), projectChangesPublisher);
  navBar.addProjects(projects);
  return navBar;
}
