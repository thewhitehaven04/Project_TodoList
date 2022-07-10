export const appEvents = {
  openNewProjectForm: 'openNewProjectFormEvent',
  openProjectViewWidget: {
    getName: () => 'openProjectViewWidgetEvent',
    setArgs: (projectTitle) => {
      return { title: projectTitle };
    },
  },
};
