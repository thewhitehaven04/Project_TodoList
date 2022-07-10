export const projectEvents = {
  projectAdded: {
    getName: () => 'projectAddedEvent',
    setArgs: (projectTitle) => {
      title: projectTitle;
    },
  },
  projectRemoved: {
    getName: () => 'projectRemovedEvent',
    setArgs: (projectTitle) => {
      title: projectTitle;
    },
  },
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
};
