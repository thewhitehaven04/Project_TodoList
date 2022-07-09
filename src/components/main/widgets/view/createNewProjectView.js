export class CreateNewProjectWidgetView {
  /** Render the project creation form */
  render() {
    const div = document.createElement('div');

    const inputProjectTitle = document.createElement('input');
    inputProjectTitle.type = 'text';
    inputProjectTitle.width = `300px`;

    const buttonSubmit = document.createElement('button');
    buttonSubmit.textContent = 'new';
    buttonSubmit.type = 'submit';

    div.appendChild(inputProjectTitle);
    div.appendChild(buttonSubmit);

    return div;
  }
}
