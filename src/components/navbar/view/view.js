import style from './style.css';

export class NavBarView {
  #projects;

  constructor(newProjectFormCallback) {
    this.#projects = [];
    this.newProjectFormCallback = newProjectFormCallback;
  }

  #renderProjectList() {
    const ulProjectItems = document.createElement('ul');

    ulProjectItems.append(
      this.#projects.forEach((project) => {
        const liProjectItem = document.createElement('li');
        liProjectItem.textContent = project;
        return liProjectItem;
      }),
    );
    return ulProjectItems;
  }

  /** Updates view depending on the event being received
   * @param {*} updateEvent
   */
  update = (updateEvent) => {
    if (updateEvent.type === 'projectAdded') {
      this.#projects.push(updateEvent.args.getTitle());
    } else if (updateEvent.type === 'projectRemoved') {
      this.#projects = this.#projects.filter((project) => project !== updateEvent.args.getTitle());
    }

    this.render();
  };

  render() {
    const navRoot = document.createElement('nav');

    const projectsDiv = document.createElement('div');

    const projectsHeader = document.createElement('div');

    const headerSpan = document.createElement('span');
    headerSpan.textContent = 'Projects';
    projectsHeader.appendChild(headerSpan);

    const addButton = document.createElement('button');
    addButton.textContent = '+';
    addButton.addEventListener('click', this.newProjectFormCallback);

    projectsHeader.appendChild(headerSpan);
    projectsHeader.appendChild(addButton);

    projectsDiv.appendChild(projectsHeader);
    projectsDiv.appendChild(this.#renderProjectList());
    navRoot.appendChild(projectsDiv);

    return navRoot;
  }
}
