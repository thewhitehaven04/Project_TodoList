import { createRequiredInputOfType } from '../../../../domUtils/input/input';
import { createSelectWithOptions } from '../../../../domUtils/select/select';
import { progressModel } from '../../../../models/progress/model';
import style from './style.css';

export class EditTaskView {
  taskViewRoot = document.createElement('article');

  /**
   * @param {import('../../../../models/task/model').TaskProps} taskProps
   */
  constructor(taskProps = {}) {
    this.taskProps = taskProps;
  }

  _bindUpdateTask(handler) {
    this.createTask = this.updateTask.bind(this, handler);
  }

  /**
   * @param {Function} handler
   * @param {import('../../../../models/task/model').TaskProps} taskProps
   */
  updateTask(handler, taskProps) {
    handler(taskProps);
  }

  render() {
    this.taskViewRoot.classList.add('task-container');

    const titleDiv = document.createElement('div');
    const title = document.createElement('span');
    title.textContent = this.taskProps.name;
    titleDiv.appendChild(title);
    titleDiv.classList.add('task-title');


    const description = document.createElement('p');
    description.textContent = this.taskProps.description;
    description.classList.add('task-description');

    const priorityInput = createSelectWithOptions('task', 'task', {
      minor: 'Minor',
      major: 'Major',
      moderate: 'Moderate',
    });
    priorityInput.classList.add('task-input');

    const progress = createRequiredInputOfType('checkbox', 'Progress').render();
    if (this.taskProps.progress === progressModel.COMPLETE.name) {
      progress.checked = true;
    }
    progress.classList.add('task-progress');

    const tagContainer = document.createElement('div');
    const tag = document.createElement('span');
    tag.textContent = this.taskProps.tag;
    tagContainer.appendChild(tag);
    tagContainer.classList.add('task-tag');

    this.taskViewRoot.append(
      ...[titleDiv, description, priorityInput, progress, tagContainer],
    );

    return this.taskViewRoot;
  }

  hide() {
    this.taskViewRoot.remove();
  }
}
