import style from './style.css';
export class CreateNewProjectWidgetView {
  /** Render the project creation form */
  render() {
    const div = document.createElement('div');
    div.classList.add('create-new-project-form');

    const inputProjectTitle = document.createElement('input');
    inputProjectTitle.type = 'text';
    inputProjectTitle.width = 300;

    const buttonSubmit = document.createElement('button');
    buttonSubmit.textContent = 'new';
    buttonSubmit.type = 'submit';

    buttonSubmit.addEventListener('click', () => {
      this.createNewProject({
        title: inputProjectTitle.value
      });
    });

    div.appendChild(inputProjectTitle);
    div.appendChild(buttonSubmit);

    return div;
  }

  /**
   * @param {import('../../../../models/project/model').ProjectProps} projectProps 
   */
  createNewProject(handler, projectProps) {
    console.log(`Passing props to handler: ${projectProps}`);
    handler(projectProps);
  }

  _bindNewProjectHandler(obj, handler) {
    this.createNewProject = this.createNewProject.bind(obj, handler);
  }
}
