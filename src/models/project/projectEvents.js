export const projectEvents = {
  projectAdded: 'projectAddedEvent',
  projectRemoved: 'projectRemovedEvent',
  projectAddedToStorage: {
    getName: () => 'projectInStorageEvent',
    setArgs: (projectTitle) => {
      title: projectTitle;
    },
  },
  projectRemovedFromStorage: {
    getName: () => 'projectRemovedFromStorageEvent',
    setArgs: (projectTitle) => {
      title: projectTitle;
    },
  },
  taskAddedToProject: {
    getName: () => 'taskAddedToProjectEvent',
    setArgs: (uuid) => {
      taskId: uuid;
    },
  },
  checklistAddedToProject: 'checklistAddedToProjectEvent',
  chekclistRemovedFromProject: 'checklistRemovedFromProjectEvent',
};
