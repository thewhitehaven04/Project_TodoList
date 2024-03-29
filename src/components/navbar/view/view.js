import style from './style.css';
import { ProjectProps } from '../../../models/project/model';

export class NavBarView {
  navRoot = document.createElement('nav');
  projectsRoot = document.createElement('ul');

  /**
   *
   * @param {ProjectProps[]} projectPropsArray
   */
  constructor(projectPropsArray = []) {
    /** ProjectProps are stored in an array
     * @type {ProjectProps[]}
     */
    this.projects = Array.from(projectPropsArray);
  }

  /**
   * @param {ProjectProps} props
   */
  addProject = (props) => {
    this.projects.push(props);
    this.renderProjects();
  };

  /**
   * @param {ProjectProps} props
   */
  removeProject = (props) => {
    this.projects = this.projects.filter(
      (existingProject) => existingProject.title != props.title,
    );
    this.renderProjects();
  };

  /** Render an ordered list of projects. */
  renderProjects() {
    this.projectsRoot.replaceChildren();
    this.projects.forEach((projectProps) => {
      const liProjectContainer = document.createElement('li');
      liProjectContainer.classList.add('navbar-list-item');

      const span = document.createElement('span');
      span.textContent = projectProps.title;
      span.dataset.projectTitle = projectProps.title;
      span.addEventListener('click', () => {
        this.openExistingProject(projectProps);
      });

      const buttonRemoveProject = document.createElement('button');
      buttonRemoveProject.innerHTML = '<i class="fa-solid fa-trash"></i>';
      buttonRemoveProject.classList.add('navbar-list-button');
      buttonRemoveProject.addEventListener('click', () => {
        this.callRemoveProjectHandler(projectProps);
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
    return newProjectFormHandler();
  }

  _bindHandleProjectRemoval(obj, handler) {
    this.callRemoveProjectHandler = this.callRemoveProjectHandler.bind(
      obj,
      handler,
    );
  }

  /**
   * @param {ProjectProps} projectProps
   */
  callRemoveProjectHandler(removeProjectHandler, projectProps) {
    removeProjectHandler(projectProps);
  }

  _bindOpenExistingProjectHandler(obj, handler) {
    this.openExistingProject = this.openExistingProject.bind(obj, handler);
  }

  openExistingProject(handler, projectTitle) {
    handler(projectTitle);
  }

  render() {
    this.navRoot.classList.add('navbar');
    this.projectsRoot.classList.add('navbar-list');

    const sectionProjects = document.createElement('section');
    sectionProjects.classList.add('navbar-section');

    const projectsSectionHeader = document.createElement('div');
    projectsSectionHeader.classList.add('section-header');

    const spanProjects = document.createElement('span');
    spanProjects.textContent = 'Projects';
    spanProjects.classList.add('section-title');
    projectsSectionHeader.appendChild(spanProjects);

    const buttonAddProjects = document.createElement('button');
    buttonAddProjects.textContent = 'Add project';
    buttonAddProjects.classList.add('navbar-button');
    buttonAddProjects.addEventListener('click', () =>
      this.navRoot.appendChild(this.openNewProjectForm()),
    );

    projectsSectionHeader.appendChild(buttonAddProjects);

    sectionProjects.appendChild(projectsSectionHeader);
    this.renderProjects();

    sectionProjects.appendChild(this.projectsRoot);
    this.navRoot.appendChild(sectionProjects);
    return this.navRoot;
  }
}
