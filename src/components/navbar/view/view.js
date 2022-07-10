import style from './style.css';

export class NavBarView {
  /** Initialize navbar view with given list of projects
   * @param {Project[]} projects an array of projects
   */

  navRoot = document.createElement('nav');
  projectsRoot = document.createElement('ul');

  constructor() {
    this.projects = [];
  }

  /**
   * @param {String} projectTitle
   */
  addProject = (projectTitle) => {
    this.projects.push(projectTitle);
    this.renderProjects();
  };

  /**
   * @param {String} projectTitle
   */
  removeProject = (projectTitle) => {
    this.projects = this.projects.filter((existingProject) => existingProject != projectTitle);
    this.renderProjects();
  };

  /** Render an ordered list of projects. */
  renderProjects() {
    this.projectsRoot.replaceChildren();
    this.projects.forEach((projectTitle) => {
      const liProjectContainer = document.createElement('li');
      liProjectContainer.classList.add('navbar-list-item');
      liProjectContainer.addEventListener('click', () => {
        this.openProjectWidget(projectTitle);
      });

      const span = document.createElement('span');
      span.textContent = projectTitle;
      span.dataset.projectTitle = projectTitle;

      const buttonRemoveProject = document.createElement('button');
      buttonRemoveProject.textContent = '✕';
      buttonRemoveProject.addEventListener('click', () => {
        this.removeProject(projectTitle);
      });

      liProjectContainer.appendChild(span);
      liProjectContainer.appendChild(buttonRemoveProject);

      this.projectsRoot.appendChild(liProjectContainer);
    });
  }

  _bindHandleOpenProjectForm(obj, handler) {
    this.openNewProjectForm = this.openNewProjectForm.bind(obj, handler);
  }

  openNewProjectForm(newProjectFormHandler) {
    newProjectFormHandler();
  }

  _bindHandleProjectRemoval(obj, handler) {
    this.callRemoveProjectHandler = this.callRemoveProjectHandler.bind(obj, handler);
  }

  callRemoveProjectHandler(removeProjectHandler) {
    removeProjectHandler();
  }

  _bindOpenExistingProjectHandler(obj, handler) {
    this.openProjectWidget = this.openProjectWidget.bind(obj, handler);
  }

  openProjectWidget(handler, projectTitle) {
    handler(projectTitle);
  }

  render() {
    this.navRoot.classList.add('navbar');

    const sectionProjects = document.createElement('section');
    const projectsSectionHeader = document.createElement('div');
    projectsSectionHeader.classList.add('section-header');

    const spanProjects = document.createElement('span');
    spanProjects.textContent = 'Projects';
    projectsSectionHeader.appendChild(spanProjects);

    const buttonAddProjects = document.createElement('button');
    buttonAddProjects.textContent = 'Add project';
    buttonAddProjects.addEventListener('click', () => this.openNewProjectForm());
    projectsSectionHeader.appendChild(buttonAddProjects);

    sectionProjects.appendChild(projectsSectionHeader);
    this.renderProjects();

    sectionProjects.appendChild(this.projectsRoot);
    this.navRoot.appendChild(sectionProjects);
    return this.navRoot;
  }
}
