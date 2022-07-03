import { ProjectAddedEvent, ProjectRemovedEvent } from '../../../models/navBar/events';
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
  addProject(projectTitle) {
    this.projects.push(projectTitle);
  }

  /**
   * @param {String} projectTitle
   */
  removeProject(projectTitle) {
    this.projects = this.projects.filter((existingProject) => existingProject != projectTitle);
  }

  renderProjects() {
    this.projectListRoot.replaceChildren();
    this.projects.forEach((projectTitle) => {
      const liProject = document.createElement('li');
      liProject.textContent = projectTitle;
      liProject.dataset.projectTitle = projectTitle;
      this.projectListRoot.appendChild(liProject);
    });

    this.projectListRoot.addEventListener('click', (event) => {
      this.openExistingProjectForm(event.target.dataset.projectTitle);
    });
  }

  update(event) {
    if (event instanceof ProjectAddedEvent) {
      this.addProject(event.project);
    } else if (event instanceof ProjectRemovedEvent) {
      this.removeProject(event.project);
    }

    this.renderProjects();
  }

  _bindHandleOpenProjectForm(obj, handler) {
    this.openNewProjectForm = this.openNewProjectForm.bind(obj, handler);
  }

  openNewProjectForm(newProjectFormHandler) {
    newProjectFormHandler();
  }

  openExistingProjectForm = () => {
    callback(project);
  };

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
