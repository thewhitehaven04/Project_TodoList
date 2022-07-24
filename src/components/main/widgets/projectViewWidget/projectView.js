import style from './style.css';
import { ProjectProps } from '../../../../models/project/model';
import { isThisSecond } from 'date-fns';

export class ProjectView {
  /**
   * @param {ProjectProps} projectProps
   */

  checklists = document.createElement('ul');
  tasks = document.createElement('ul');

  constructor(projectProps) {
    this.props = {
      title: projectProps.title,
      checklists: projectProps.checklists ?? [],
      tasks: projectProps.tasks ?? [],
    };
  }

  addTask = (taskProps) => {
    this.props.tasks.push(taskProps);
    this.#renderTasks();
  };

  addChecklist = (checklistProps) => {
    this.props.checklists.push(checklistProps);
    this.#renderChecklists();
  };

  #renderChecklists() {
    this.checklists.classList.add('flex-list');
    this.checklists.replaceWith(
      ...this.props.checklists.map((checklist) => {
        return this.displayChecklistUpdateWidget(checklist);
      }),
    );
  }

  #renderTasks() {
    this.tasks.classList.add('flex-list');
    this.tasks.replaceWith(
      ...this.props.tasks.map((task) => {
        return this.displayTaskUpdateWidget(task);
      }),
    );
  }

  /** Display project information with its title, tasks and checklists. */
  render() {
    const rootDiv = document.createElement('div');
    const spanTitle = document.createElement('span');
    spanTitle.textContent = this.props.title;
    rootDiv.appendChild(spanTitle);

    const checklistsSection = document.createElement('section');
    const spanChecklists = document.createElement('span');
    spanChecklists.textContent = 'Checklists';

    const divNewChecklistForm = document.createElement('div');

    const addCheckListButton = document.createElement('button');
    addCheckListButton.textContent = '+';
    addCheckListButton.addEventListener('click', () => {
      divNewChecklistForm.appendChild(this.displayChecklistCreateWidget());
    });

    checklistsSection.append(
      ...[
        spanChecklists,
        this.checklists,
        divNewChecklistForm,
        addCheckListButton,
      ],
    );
    rootDiv.appendChild(checklistsSection);

    const tasksSection = document.createElement('section');
    const taskSectionHeader = document.createElement('span');
    taskSectionHeader.textContent = 'Tasks';

    const divNewTaskForm = document.createElement('div');

    const addTaskButton = document.createElement('button');
    addTaskButton.textContent = '+';
    addTaskButton.addEventListener('click', () => {
      divNewTaskForm.appendChild(this.displayTaskCreateWidget());
    });

    tasksSection.append(
      ...[taskSectionHeader, this.tasks, divNewTaskForm, addTaskButton],
    );
    rootDiv.appendChild(tasksSection);

    // These are temporary borders
    rootDiv.classList.add('border');
    tasksSection.classList.add('border');
    checklistsSection.classList.add('border');

    return rootDiv;
  }

  displayChecklistCreateWidget = (handler) => {
    return handler();
  };

  /**
   * @param {import('../../../../models/checklist/model').ChecklistProps} checklistProps
   */
  displayChecklistUpdateWidget = (handler, checklistProps) => {
    return handler(checklistProps);
  };

  displayTaskCreateWidget = (displayTaskWidgetHandler) => {
    return displayTaskWidgetHandler();
  };

  /**
   *
   * @param {import('../../../../models/task/model').TaskProps} taskProps
   * @returns
   */
  displayTaskUpdateWidget = (displayTaskWidgetHandler, taskProps) => {
    return displayTaskWidgetHandler(taskProps);
  };
}
