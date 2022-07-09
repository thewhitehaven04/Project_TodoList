export const appEvents = {
  openNewProjectForm: 'openNewProjectFormEvent',
  openProjetViewWidget: () => {
    return {
      getName: () => 'openProjectViewWidgetEvent',
      setArgs: (projectTitle) => {
        title: projectTitle;
      },
    };
  },
};
