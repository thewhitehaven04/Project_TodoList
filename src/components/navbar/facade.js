import { NavBarView } from './view/view';
import { NavBarModel } from '../../models/navBar/navBar';
import { NavBarController } from './controller';
import { PubSub } from '../../generic/pubSub';
import { ProjectProps } from '../../models/project/model';

export class NavBarFacade {
  /**
   * @param {ProjectProps[]} projectPropsArr
   * @param {PubSub} eventBus application event bus
   */
  constructor(projectPropsArr, eventBus) {
    const localPs = new PubSub();
    const projects = projectPropsArr.map((projectProps) => projectProps.title);

    this.navBarController = new NavBarController(
      new NavBarView(),
      new NavBarModel(projects, localPs),
      localPs,
      eventBus,
    );
  }

  render() {
    return this.navBarController.render();
  }
}
