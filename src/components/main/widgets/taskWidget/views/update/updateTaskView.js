import { createSelectWithOptions } from '../../../../../../domUtils/select/select';
import { progressModel } from '../../../../../../models/progress/model';
import { prioritiesModel } from '../../../../../../models/priority/model';
import { zipObject } from 'lodash';
import style from './style.css';
import format from 'date-fns/format';
import parse from 'date-fns/parse';

export class UpdateTaskView {
  taskViewRoot = document.createElement('article');
  title = document.createElement('div');
  description = document.createElement('p');
  dueDate = document.createElement('div');
  buttonComplete = document.createElement('button');

  /**
   * @param {import('../../../../../../models/task/model').TaskProps} taskProps
   */
  constructor(taskProps) {
    this.taskProps = taskProps ?? {};
  }

  // bindings to controller methods 

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

  /** Call completion handler from the controller. Needs to be bound from the controller first
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

  /** Dynamically changes the button apperance depending
   * whether the task state is complete or not. */
  buttonUpdate() {
    if (this.taskProps.progress === progressModel.COMPLETE.name) {
      this.buttonComplete.classList.add('task-complete');
      this.buttonComplete.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
    } else {
      this.buttonComplete.classList.remove('task-complete');
      this.buttonComplete.innerHTML = '<i class="fa-solid fa-check"></i> Complete';
    }
  }

  #colorizeRedIfOverdue() {
    if (this.taskProps.isOverdue) {
      this.dueDate.classList.add('task-overdue');
    }
  }

  /**
   * @returns {HTMLSpanElement[]}
   */
  #renderTags() {
    return this.taskProps.tags.map(tag => {
      const tagSpan = document.createElement('span');
      tagSpan.textContent = tag;
      tagSpan.classList.add('task-tag');
      return tagSpan;
    })
  }

  render() {
    this.taskViewRoot.classList.add('task-container');

    this.title.textContent = this.taskProps.name;
    this.title.classList.add('task-title');

    this.description.textContent = this.taskProps.description;
    this.description.classList.add('task-description');

    this.dueDate = document.createElement('div');
    this.dueDate.classList.add(...['task-due', 'task-due-text']);
    this.#colorizeRedIfOverdue();

    const dueDateText = document.createElement('span');
    dueDateText.textContent = `Due: ${format(parse(this.taskProps.dueDate, 'y-LL-dd', new Date()), 'LLLL do, yyyy')
      }`;
    const dueDateIcon = document.createElement('i');
    dueDateIcon.classList.add(...['fa-solid', 'fa-calendar']);
    this.dueDate.append(...[dueDateIcon, dueDateText]);

    /** creating a map between human-readable priority names and internal values */
    const names = Object.entries(prioritiesModel).map((entry) => entry[1].name);
    const values = Object.entries(prioritiesModel).map(
      (entry) => entry[1].displayName,
    );

    const priorityInputContainer = document.createElement('div');
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
        tag: this.taskProps.tags,
      });
    });

    priorityInputContainer.classList.add('task-priority');
    priorityInputContainer.appendChild(priorityInput);

    this.buttonComplete.classList.add('task-progress');
    this.buttonUpdate();
    
    /** toggles task completion state */
    this.buttonComplete.addEventListener('click', () => this.complete());

    const tagContainer = document.createElement('div');
    tagContainer.classList.add(...['task-tags', 'task-tag-flex']);
    tagContainer.append(...this.#renderTags());

    this.taskViewRoot.append(
      ...[
        this.title,
        this.description,
        this.dueDate,
        priorityInputContainer,
        this.buttonComplete,
        tagContainer,
      ],
    );

    return this.taskViewRoot;
  }

  /** Hide task widget */
  hide() {
    this.taskViewRoot.remove();
  }
}
