import style from './style.css';
export class CreateNewProjectWidgetView {
  /** Render the project creation form */
  root = document.createElement('div');

  render() {
    this.root.classList.add('create-new-project-form');

    const inputProjectTitle = document.createElement('input');
    inputProjectTitle.type = 'text';
    inputProjectTitle.width = 300;
    inputProjectTitle.maxLength = 16;

    const buttonSubmit = document.createElement('button');
    buttonSubmit.textContent = 'new';
    buttonSubmit.type = 'submit';

    buttonSubmit.addEventListener('click', () => {
      this.createNewProject(inputProjectTitle.value);
      this.close();
    });

    this.root.appendChild(inputProjectTitle);
    this.root.appendChild(buttonSubmit);

    return this.root;
  }

  /**
   * @param {import('../../../../models/project/model').ProjectProps} projectProps
   */
  createNewProject(handler, projectProps) {
    console.log(`Passing props to handler: ${projectProps}`);
    handler(projectProps);
  }

  close() {
    this.root.replaceChildren();
  }

  _bindNewProjectHandler(obj, handler) {
    this.createNewProject = this.createNewProject.bind(obj, handler);
  }
}
