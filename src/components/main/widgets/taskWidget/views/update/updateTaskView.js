import { createSelectWithOptions } from '../../../../../../domUtils/select/select';
import { progressModel } from '../../../../../../models/progress/model';
import { prioritiesModel } from '../../../../../../models/priority/model';
import { zipObject } from 'lodash';
import style from './style.css';

export class UpdateTaskView {
  taskViewRoot = document.createElement('article');
  buttonComplete = document.createElement('button');

  /**
   * @param {import('../../../../../../models/task/model').TaskProps} taskProps
   */
  constructor(taskProps) {
    this.taskProps = taskProps ?? {};
  }

  _bindUpdateTask(handler) {
    this.updateTask = this.updateTask.bind(this, handler);
  }

  _bindComplete(handler) {
    this.complete = this.complete.bind(this, handler);
  }

  /**
   * @param {Function} handler
   * @param {import('../../../../../../models/task/model').TaskProps} taskProps
   */
  updateTask(handler, taskProps) {
    handler(taskProps);
  }

  /**
   * @param {Function} handler
   */
  complete(handler) {
    handler();
  }

  /**
   * @param {import('../../../../../../models/task/model').TaskProps} props
   */
  updateView(props) {
    this.taskProps = props;
    this.buttonUpdate();
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

    const names = Object.entries(prioritiesModel).map((entry) => entry[1].name);
    const values = Object.entries(prioritiesModel).map(
      (entry) => entry[1].displayName,
    );

    const priorityInput = createSelectWithOptions(
      'task',
      'task',
      zipObject(names, values),
    );

    priorityInput.addEventListener('change', () => {
      // @ts-ignore
      this.updateTask({
        name: this.taskProps.name,
        description: this.taskProps.description,
        dueDate: this.taskProps.dueDate,
        priority: priorityInput.value,
        tag: this.taskProps.tag,
      });
    });

    priorityInput.classList.add('task-priority');

    this.buttonComplete.classList.add('task-progress');
    this.buttonUpdate();
    this.buttonComplete.addEventListener('click', () => this.complete());

    const tagContainer = document.createElement('div');
    tagContainer.classList.add(...['task-tags', 'task-tags-flex']);

    const tag = document.createElement('span');
    tag.textContent = this.taskProps.tag;
    tag.classList.add('task-tag');

    tagContainer.appendChild(tag);

    this.taskViewRoot.append(
      ...[
        titleDiv,
        description,
        priorityInput,
        this.buttonComplete,
        tagContainer,
      ],
    );

    return this.taskViewRoot;
  }

  buttonUpdate() {
    if (this.taskProps.progress === progressModel.COMPLETE.name) {
      this.buttonComplete.classList.add('task-complete');
      this.buttonComplete.textContent = 'Completed';
    } else {
      this.buttonComplete.classList.remove('task-complete');
      this.buttonComplete.textContent = 'Mark complete';
    }
  }

  hide() {
    this.taskViewRoot.remove();
  }
}
