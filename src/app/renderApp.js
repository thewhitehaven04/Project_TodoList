/** Renders the whole app (navigation + main section) */
import style from './style.css';

export class AppView {
  #mainView;
  #navBarView;
  #appRoot;

  constructor(appRoot, main, navBar) {
    this.#appRoot = appRoot;
    this.#mainView = main;
    this.#navBarView = navBar;
  }

  #positionChildInAppGrid(child, gridArea) {
    child.render().style.gridArea = gridArea;
  }

  render() {
    this.#positionChildInAppGrid(this.#mainView, 'main');
    this.#positionChildInAppGrid(this.#navBarView, 'navbar');

    this.#appRoot.appendChild(this.#mainView.render());
    this.#appRoot.appendChild(this.#navBarView.render());
  }
}
