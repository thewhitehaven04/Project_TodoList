import style from './style.css';

export class AddProjectWidget {
  render() {
    const projectContainerDiv = document.createElement('div');

    const inputTitle = document.createElement('input');
    inputTitle.type = 'text';

    inputTitle.classList.add('project-input');

    const afterSpan = document.createElement('span');

    projectContainerDiv.appendChild(inputTitle);
    projectContainerDiv.appendChild(afterSpan);
  }
}
