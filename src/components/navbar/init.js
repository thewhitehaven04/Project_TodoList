import { NavBarView } from './view/view';
import { NavBarModel } from '../../models/navBar/navBar';
import { NavBarController } from './controller';
import { PubSub } from '../../generic/pubSub';

/**
 * @param {String[]} projects
 * @param {PubSub} fromNavBarPs
 */
export function initNavBar(projects, fromNavBarPs) {
  const localPs = new PubSub();
  return new NavBarController(
    new NavBarView(),
    new NavBarModel(projects, localPs),
    localPs,
    fromNavBarPs,
  );
}
