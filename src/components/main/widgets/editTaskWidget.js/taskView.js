import { createRequiredInputOfType } from '../../../../domUtils/input/input';
import { createSelectWithOptions } from '../../../../domUtils/select/select';
import { progressModel } from '../../../../models/progress/model';

export class EditTaskView {
  taskViewRoot = document.createElement('div');

  /**
   * @param {import('../../../../models/task/model').TaskProps} taskProps
   */
  constructor(taskProps) {
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
    const title = document.createElement('span');
    title.textContent = this.taskProps.name;

    const description = document.createElement('p');
    description.textContent = this.taskProps.description;

    const priorityInput = createSelectWithOptions('task', 'task', {
      minor: 'Minor',
      major: 'Major',
      moderate: 'Moderate',
    });

    const progress = createRequiredInputOfType('checkbox', 'Progress').render();
    if (this.taskProps.progress === progressModel.COMPLETE.name) {
      progress.checked = true;
    }

    const tag = document.createElement('span');
    tag.textContent = this.taskProps.tag;
  }
}
