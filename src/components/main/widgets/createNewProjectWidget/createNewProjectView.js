import style from './style.css';
export class CreateNewProjectWidgetView {
  /** Render the project creation form */
  root = document.createElement('div');

  /**
   * @typedef {Object} ProjectFactoryViewProps
   * @property {Number} minLength
   * @property {Number} maxLength
   */

  /**
   * Instantiates a project creation form
   * @param {ProjectFactoryViewProps} renderProps
   */
  constructor(renderProps = { minLength: 4, maxLength: 32 }) {
    this.renderProps = renderProps;
  }

  render() {
    this.root.classList.add('create-new-project-form');

    const inputProjectTitle = document.createElement('input');
    inputProjectTitle.type = 'text';
    inputProjectTitle.width = 300;
    inputProjectTitle.minLength = this.renderProps.minLength;
    inputProjectTitle.required = true;
    inputProjectTitle.maxLength = this.renderProps.maxLength;

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
