import style from './style.css';
import { ProjectProps } from '../../../../models/project/model';

export class ProjectView {

  rootDiv = document.createElement('div');
  checklists = document.createElement('ul');
  tasks = document.createElement('ul');

  /**
   * @param {ProjectProps} projectProps
   */
  constructor(projectProps) {
    this.props = {
      title: projectProps.title,
      checklists: projectProps.checklists ?? [],
      tasks: projectProps.tasks ?? [],
    };
  }

  /**
   * @param {import('../../../../models/task/model').TaskProps} taskProps
   */
  addTask = (taskProps) => {
    this.props.tasks.push(taskProps);
    this.#renderTasks();
  };

  /**
   * @param {import('../../../../models/task/model').TaskProps} taskProps
   */
  removeTask = (taskProps) => {
    this.props.tasks = this.props.tasks.filter(
      (existingTaskProps) => existingTaskProps.name !== taskProps.name,
    );
    this.#renderTasks();
  };

  /**
   * @param {import('../../../../models/checklist/model').ChecklistProps} checklistProps
   */
  addChecklist = (checklistProps) => {
    this.props.checklists.push(checklistProps);
    this.#renderChecklists();
  };

  /**
   * @param {import('../../../../models/checklist/model').ChecklistProps} checklistProps
   */
  removeChecklist = (checklistProps) => {
    this.props.checklists = this.props.checklists.filter(
      (existingChecklistProps) =>
        existingChecklistProps.title !== checklistProps.title,
    );
    this.#renderChecklists();
  };

  #renderChecklists() {
    this.checklists.classList.add(...['article-list', 'flex-list', 'flex-middle', 'flex-scrollable-list']);
    this.checklists.replaceChildren(
      ...this.props.checklists.map((checklist) => {
        return this.displayChecklistUpdateWidget(checklist);
      }),
    );
  }

  #renderTasks() {
    this.tasks.classList.add(...['article-list', 'flex-list', 'flex-middle', 'flex-scrollable-list']);
    this.tasks.replaceChildren(
      ...this.props.tasks.map((task) => {
        return this.displayTaskUpdateWidget(task);
      }),
    );
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

  /** Closes the project view. */
  hide() {
    this.rootDiv.replaceChildren();
  }

  /** Display project information with its title, tasks and checklists. */
  render() {
    const spanTitle = document.createElement('span');
    spanTitle.textContent = this.props.title;
    spanTitle.classList.add('project-view-title');
    this.rootDiv.appendChild(spanTitle);
    this.rootDiv.classList.add(...['project-view-grid', 'project-view']);

    const checklistsSection = document.createElement('section');
    checklistsSection.classList.add(
      ...['project-view-checklists', 'flex-list', 'flex-middle'],
    );

    const divChecklistsHeader = document.createElement('div');
    const spanChecklists = document.createElement('span');
    spanChecklists.textContent = 'Checklists';

    const ulNewChecklists = document.createElement('ul');
    ulNewChecklists.classList.add(...['flex-list', 'flex-middle']);

    const addCheckListButton = document.createElement('button');
    addCheckListButton.textContent = 'New';
    addCheckListButton.addEventListener('click', () => {
      ulNewChecklists.appendChild(this.displayChecklistCreateWidget());
    });

    divChecklistsHeader.append(...[spanChecklists, addCheckListButton]);
    divChecklistsHeader.classList.add('project-view-header-block');

    this.#renderChecklists();
    checklistsSection.append(
      ...[divChecklistsHeader, this.checklists, ulNewChecklists],
    );
    this.rootDiv.appendChild(checklistsSection);

    const tasksSection = document.createElement('section');
    const divTasksHeader = document.createElement('div');
    tasksSection.classList.add(...['project-view-tasks', 'flex-list', 'flex-middle']);

    const taskSectionHeader = document.createElement('span');
    taskSectionHeader.textContent = 'Tasks';

    const ulNewTasks = document.createElement('ul');
    ulNewTasks.classList.add(...['flex-list', 'flex-middle']);

    const addTaskButton = document.createElement('button');
    addTaskButton.textContent = 'New';
    addTaskButton.addEventListener('click', () => {
      ulNewTasks.appendChild(this.displayTaskCreateWidget());
    });

    divTasksHeader.append(...[taskSectionHeader, addTaskButton]);
    divTasksHeader.classList.add('project-view-header-block');

    this.#renderTasks();
    tasksSection.append(...[divTasksHeader, this.tasks, ulNewTasks]);
    this.rootDiv.appendChild(tasksSection);

    return this.rootDiv;
  }
}
