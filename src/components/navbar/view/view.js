import style from './style.css';

export class NavBarView {
  /** Initialize navbar view with given list of projects
   * @param {Project[]} projects an array of projects
   */
  constructor() {
    this.projects = [];
    this.navRoot = document.createElement('nav');

    this.projectListRoot = document.createElement('ul');
    this.navRoot.appendChild(this.projectListRoot);
  }

  /**
   * @param {String} projectTitle
   */
  addProject = (projectTitle) => {
    this.projects.push(projectTitle);
    this.renderProjects();
  }

  /**
   * @param {String} projectTitle
   */
  removeProject = (projectTitle) => {
    this.projects = this.projects.filter((existingProject) => existingProject != projectTitle);
    this.renderProjects();
  }

  renderProjects() {
    this.projectListRoot.replaceChildren();
    this.projects.forEach((projectTitle) => {
      const liProject = document.createElement('li');
      liProject.textContent = projectTitle;
      liProject.dataset.projectTitle = projectTitle;
      this.projectListRoot.appendChild(liProject);
    });
  }

  _bindHandleOpenProjectForm(obj, handler) {
    this.openNewProjectForm = this.openNewProjectForm.bind(obj, handler);
  }

  openNewProjectForm(newProjectFormHandler) {
    newProjectFormHandler();
  }

  render() {
    const divProjects = document.createElement('div');
    const spanProjects = document.createElement('span');
    spanProjects.textContent = 'Projects';

    const buttonAddProjects = document.createElement('button');
    buttonAddProjects.textContent = '+';
    buttonAddProjects.addEventListener('click', (event) => {
      this.openNewProjectForm();
    });

    divProjects.appendChild(spanProjects);
    divProjects.appendChild(buttonAddProjects);

    this.renderProjects();
    this.navRoot.appendChild(divProjects);
    return this.navRoot;
  }
}
