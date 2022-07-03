/** Renders the whole app (navigation + main section) */
import style from './style.css';

export class AppView {
  constructor(appRoot, main, navBar) {
    this.appRoot = appRoot;
    this.mainView = main.render();
    this.navBarView = navBar.render();
  }

  #positionChildInAppGrid(child, gridArea) {
    child.style.gridArea = gridArea;
  }

  render() {
    this.#positionChildInAppGrid(this.mainView, 'main');
    this.#positionChildInAppGrid(this.navBarView, 'navbar');

    this.appRoot.appendChild(this.mainView);
    this.appRoot.appendChild(this.navBarView);
  }
}
