import style from './style.css';
import { ProjectProps } from './../../../../models/project/model';

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

    this.#renderChecklists();
    this.#renderTasks();
  }

  addTask = (taskProps) => {
    this.props.tasks.push(taskProps);
    this.#renderTasks();
  };

  #renderChecklists() {
    this.checklists.classList.add('flex-list');
    this.props.checklists.forEach((checklist) => {
      const liChecklist = document.createElement('li');
      liChecklist.textContent = checklist;
      this.checklists.appendChild(liChecklist);
    });
  }

  #renderTasks() {
    this.tasks.classList.add('flex-list');
    this.props.tasks.forEach((task) => {
      const liTask = document.createElement('li');
      liTask.textContent = task;
      this.tasks.appendChild(liTask);
    });
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
      divNewChecklistForm.appendChild(this.displayChecklistWidget());
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
      divNewTaskForm.appendChild(this.displayTaskWidget());
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

  // _bindDisplayChecklistWidgetHandler(handler) {
  //   this.displayChecklistWidget = this.displayChecklistWidget.bind(
  //     this,
  //     handler,
  //   );
  // }

  // displayChecklistWidget = (displayChecklistWidgetHandler) => {
  //   displayChecklistWidgetHandler();
  // };

  /**
   *
   * @param {View} displayTaskWidgetHandler
   * @returns
   */
  displayTaskCreateWidget = (displayTaskWidgetHandler) => {
    return displayTaskWidgetHandler();
  };

  displayTaskUpdateWidget = (displayTaskWidgetHandler, taskProps) => {
    return displayTaskWidgetHandler(taskProps);
  };
}
