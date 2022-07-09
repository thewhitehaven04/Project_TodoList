import { ProjectView } from './view/existingProjectView';

export class ProjectViewController {
  /**
   * @param {ProjectView} view
   */
  constructor(view) {
    this.view = view;
  }

  render() {
    return this.view.render();
  }
}
