export const projectEvents = {
  projectAdded: 'projectAddedEvent',
  projectRemoved: 'projectRemovedEvent',
  projectAddedToStorage: 'projectAddedToStorageEvent',
  projectRemovedFromStorage: 'projectRemovedFromStorageEvent',
  taskAddedToProject: {
    getName: () => 'taskAddedToProjectEvent',
    setArgs: (uuid) => {
      taskId: uuid;
    },
  },
  taskRemovedFromProject: 'taskRemovedFromProject',
  checklistAddedToProject: 'checklistAddedToProjectEvent',
  chekclistRemovedFromProject: 'checklistRemovedFromProjectEvent',
};
