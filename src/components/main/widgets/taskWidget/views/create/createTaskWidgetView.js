import {
  getActiveRadioOfArray,
  createRadioWithLabel,
  createRequiredInputOfType,
  createFutureDataPicker,
} from '../../../../../../domUtils/input/input';
import { createNamedTextarea } from '../../../../../../domUtils/textarea/textarea';
import { prioritiesModel } from '../../../../../../models/priority/model';
import { progressModel } from '../../../../../../models/progress/model';
import style from './style.css';

export class CreateTaskView {
  /**
   * @param {prioritiesModel} priorityStates
   */

  rootDiv = document.createElement('div');

  constructor(priorityStates) {
    this.priorityStates = Object.values(priorityStates);
  }

  _bindCreateTask(handler) {
    this.createTask = this.createTask.bind(this, handler);
  }

  /**
   * @param {Function} handler
   * @param {import('../../../../../../models/task/model').TaskProps} taskProps
   */
  createTask(handler, taskProps) {
    handler(taskProps);
  }

  render() {
    this.rootDiv.classList.add('grid-new-task');

    const nameInput = createRequiredInputOfType('input', 'Title');
    const name = nameInput.render();
    name.style.gridArea = 'name';

    const descriptionTextarea = createNamedTextarea('Description');
    const description = descriptionTextarea.render();
    description.style.gridArea = 'description';

    const dueDateInput = createFutureDataPicker('Due date:');
    const dueDate = dueDateInput.render();
    dueDate.style.gridArea = 'dueDate';

    const tagInput = createRequiredInputOfType('tag', 'Tag');
    const tag = tagInput.render();
    tag.style.gridArea = 'tag';

    const prioritiesFieldset = document.createElement('fieldset');
    prioritiesFieldset.style.gridArea = 'priority';
    prioritiesFieldset.classList.add('priorities-fieldset');

    const prioritiesLegend = document.createElement('legend');
    prioritiesLegend.textContent = 'Priority';
    prioritiesFieldset.appendChild(prioritiesLegend);
    prioritiesLegend.classList.add(...['flex-fieldset', 'priorities-legend']);

    const radios = [];

    for (let priorityState of this.priorityStates) {
      const radio = createRadioWithLabel(
        'priority',
        priorityState.name,
        priorityState.displayName,
      );
      prioritiesFieldset.appendChild(radio.render());
      radios.push(radio.getRadio());
    }

    const buttonCreate = document.createElement('button');
    buttonCreate.type = 'button';
    buttonCreate.textContent = 'Create new task';
    buttonCreate.style.gridArea = 'button';

    buttonCreate.addEventListener('click', () => {
      // @ts-ignore
      this.createTask({
        name: nameInput.getValue(),
        description: descriptionTextarea.getValue(),
        dueDate: dueDateInput.getValue(),
        priority: getActiveRadioOfArray(radios).value,
        progress: progressModel.NOT_STARTED.name,
        tags: tagInput.getValue().split(' '),
      });

      this.hide();
    });

    this.rootDiv.append(
      ...[name, description, dueDate, tag, prioritiesFieldset, buttonCreate],
    );
    return this.rootDiv;
  }

  hide() {
    this.rootDiv.remove();
  }
}
