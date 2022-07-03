export class CreateNewProjectWidgetView {
  /** Render the project creation form */
  render() {
    const div = document.createElement('div');
    const form = document.createElement('form');

    const inputProjectTitle = document.createElement('input');
    inputProjectTitle.type = 'text';
    inputProjectTitle.width = `300px`;

    const buttonSubmit = document.createElement('button');
    buttonSubmit.textContent = 'new';
    buttonSubmit.type = 'submit';

    form.appendChild(inputProjectTitle);
    form.appendChild(buttonSubmit);

    div.appendChild(form);
    return div;
  }
}
