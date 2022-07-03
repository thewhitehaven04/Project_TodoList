import { NavBarView } from './view/view';
import { NavBarModel } from '../../models/navBar/navBar';
import { NavBarController } from './controller';
import { PubSub } from '../../generic/pubSub';

export function initNavBar(projectStorage, fromNavBarPs) {
  const localPs = new PubSub();
  return new NavBarController(
    new NavBarView(),
    new NavBarModel(projectStorage, localPs),
    localPs,
    fromNavBarPs,
  );
}
