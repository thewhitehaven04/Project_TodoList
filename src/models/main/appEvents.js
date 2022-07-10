export const appEvents = {
  openNewProjectForm: 'openNewProjectFormEvent',
  openProjectViewWidget: () => {
    return {
      getName: () => 'openProjectViewWidgetEvent',
      setArgs: (projectTitle) => {
        title: projectTitle;
      },
    };
  },
};
