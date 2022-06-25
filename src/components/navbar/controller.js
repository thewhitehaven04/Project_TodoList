import { NavBarView } from './view/view';
import { NavBarModel } from './model/model';

export class NavBarController {
  constructor() {
    this.view = NavBarView;
    this.model = NavBarModel;
  }

  getNavBar(projects) {

    const view = new this.view(projects);
    const model = new this.model(projects);

    return {render: view.render()}

  }
}
