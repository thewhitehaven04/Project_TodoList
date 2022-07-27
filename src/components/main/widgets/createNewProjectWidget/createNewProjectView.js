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
    inputProjectTitle.required = true;
    inputProjectTitle.minLength = 3;

    const buttonSubmit = document.createElement('button');
    buttonSubmit.textContent = 'new';
    buttonSubmit.type = 'submit';

    buttonSubmit.addEventListener('click', () => {
      if (inputProjectTitle.value !== '') {
        this.createNewProject(inputProjectTitle.value);
        this.close();
      }
    });

    this.root.append(...[inputProjectTitle, buttonSubmit]);

    return this.root;
  }

  /**
   * @param {String} title
   */
  createNewProject(handler, title) {
    handler(title);
  }

  close() {
    this.root.replaceChildren();
  }

  _bindNewProjectHandler(obj, handler) {
    this.createNewProject = this.createNewProject.bind(obj, handler);
  }
}
