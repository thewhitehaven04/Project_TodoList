import style from './style.css';

export class ProjectView {
  /**
   * @param {import("../../../../models/project/model").ProjectProps} projectProps
   */
  constructor(projectProps) {
    this.title = projectProps.title;
    this.checklists = projectProps.checklists ?? [];
    this.tasks = projectProps.tasks ?? [];
  }

  /** Display project information with its title, tasks and checklists. */
  render() {
    const rootDiv = document.createElement('div');
    const spanTitle = document.createElement('span');
    spanTitle.textContent = this.title;
    rootDiv.appendChild(spanTitle);

    const checklistsSection = document.createElement('section');
    const spanChecklists = document.createElement('span');
    spanChecklists.textContent = 'Checklists';

    const ulChecklist = document.createElement('ul');
    ulChecklist.classList.add('flex-list');
    this.checklists.forEach((checklist) => {
      const liChecklist = document.createElement('li');
      liChecklist.textContent = checklist;
      ulChecklist.appendChild(liChecklist);
    });

    checklistsSection.append(...[spanChecklists, ulChecklist]);
    rootDiv.appendChild(checklistsSection);

    const tasksSection = document.createElement('section');
    const taskSectionHeader = document.createElement('span');
    taskSectionHeader.textContent = 'Tasks';

    const ulTasks = document.createElement('ul');
    ulTasks.classList.add('flex-list');
    this.checklists.forEach((task) => {
      const liTask = document.createElement('li');
      liTask.textContent = task;
      liTask.appendChild(liTask);
    });

    tasksSection.append(...[taskSectionHeader, ulTasks]);
    rootDiv.appendChild(tasksSection);
    
    // These are temporary
    rootDiv.classList.add('border');
    tasksSection.classList.add('border'); 
    checklistsSection.classList.add('border');

    return rootDiv;
  }
}
