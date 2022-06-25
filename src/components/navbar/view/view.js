import style from './style.css';

export class NavBarView {
  navRoot;
  #projects;

  constructor(projects) {
    navRoot = document.createElement('nav');
    this.#projects = projects;
  }

  _renderProjectMenuItem(project) {
    const liProjectItem = document.createElement('li');
    liProjectItem.textContent = project.getName();
    return liProjectItem;
  }

  _renderProjectList() {
    const ulProjectItems = document.createElement('ul');

    ulProjectItems.appendChild(this.#projects.forEach((project) => this._renderProjectMenuItem(project)));
    return ulProjectItems;
  }

  render() {
    this.navRoot.appendChild(this._renderProjectList)
    return navRoot;
  }
}
