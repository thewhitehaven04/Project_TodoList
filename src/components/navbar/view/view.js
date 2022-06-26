import style from './style.css';

export class NavBarView {
  navRoot;
  #projects;

  constructor() {
    this.navRoot = document.createElement('nav');
    this.#projects = [];
  }

  #renderProjectMenuItem(project) {
    const liProjectItem = document.createElement('li');
    liProjectItem.textContent = project.getName();
    return liProjectItem;
  }

  #renderProjectList() {
    const ulProjectItems = document.createElement('ul');

    ulProjectItems.appendChild(
      this.#projects.forEach((project) => this.#renderProjectMenuItem(project)),
    );
    return ulProjectItems;
  }

  /** Updates view depending on the event being received */
  update = (updateEvent) => {
    if (updateEvent.type === 'projectAdded') {
      this.#projects.push(updateEvent.args.getTitle());
    } else if (updateEvent.type === 'projectRemoved') {
      this.#projects = this.#projects.filter((project) => project !== updateEvent.args.getTitle());
    }

    this.render();
  };

  render() {
    this.navRoot.replaceChildren(this.#renderProjectList());
    return navRoot;
  }
}
