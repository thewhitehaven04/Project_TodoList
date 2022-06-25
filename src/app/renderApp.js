/** Renders the whole app (navigation + main section) */
import style from './style.css';

export class AppView {
  #mainView;
  #navBarView;
  #appRoot;

  constructor(appRoot, main, navBar) {
    this.#mainView = main;
    this.#navBarView = navBar;
    this.#appRoot = appRoot;
  }

  _positionChildInAppGrid(child, gridArea) {
    child.render().style.gridArea = gridArea;      
  }

  render() {
    this._positionChildInAppGrid(this.#mainView, 'main');
    this._positionChildInAppGrid(this.#navBarView, 'navbar');

    this.#appRoot.appendChild(this.#mainView.render());
    this.#appRoot.appendChild(this.#navBarView.render());
  }
}
