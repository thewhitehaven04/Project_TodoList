import style from './style.css';
import { MainController } from '../components/main/main';
import { NavBarController } from '../components/navbar/controller';

/** Renders the whole app (navigation + main section) */
export class AppView {
  /**
   *
   * @param {Node} appRoot root element of the application
   * @param {MainController} main main pane controller instance
   * @param {NavBarController} navBar navbar controller instance
   */
  constructor(appRoot, main, navBar) {
    this.appRoot = appRoot;
    this.mainView = main.render();
    this.navBarView = navBar.render();
  }

  /** Positioning application panes in the root grid */
  #positionChildInAppGrid(child, gridArea) {
    child.style.gridArea = gridArea;
  }

  /** Display the app. */
  render() {
    this.#positionChildInAppGrid(this.mainView, 'main');
    this.#positionChildInAppGrid(this.navBarView, 'navbar');

    this.appRoot.appendChild(this.mainView);
    this.appRoot.appendChild(this.navBarView);
  }
}
