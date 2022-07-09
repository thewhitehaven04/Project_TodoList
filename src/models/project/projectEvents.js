export const projectEvents = {
  projectAdded: () => {
    return {
      getName: () => 'projectAddedEvent',
      setArgs: (projectTitle) => {
        title: projectTitle;
      },
    };
  },
  projectRemoved: () => {
    return {
      getName: () => 'projectRemovedEvent',
      setArgs: (projectTitle) => {
        title: projectTitle;
      },
    };
  },
  projectAddedToStorage: () => {
    return {
      getName: () => 'projectInStorageEvent',
      setArgs: (projectTitle) => {
        title: projectTitle;
      },
    };
  },
  projectRemovedFromStorage: () => {
    return {
      getName: () => 'projectRemovedFromStorageEvent',
      setArgs: (projectTitle) => {
        title: projectTitle;
      },
    };
  },
};
