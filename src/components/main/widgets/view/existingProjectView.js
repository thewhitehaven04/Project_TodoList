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
    this.checklists.forEach((checklist) => {
      const liChecklist = document.createElement('li');
      liChecklist.textContent = checklist;
      ulChecklist.appendChild(liChecklist);
    });

    checklistsSection.append(...[spanChecklists, ulChecklist]);

    const tasksSection = document.createElement('section');
    const taskSectionHeader = document.createElement('span');
    taskSectionHeader.textContent = 'Tasks';

    const ulTasks = document.createElement('ul');
    this.checklists.forEach((task) => {
      const liTask = document.createElement('li');
      liTask.textContent = task;
      liTask.appendChild(liTask);
    });

    tasksSection.append(...[taskSectionHeader, ulTasks]);
  }
}
