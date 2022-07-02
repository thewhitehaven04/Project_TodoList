import { initAppState } from './app/init';
import { AppView } from './app/renderApp';
import { Main } from './components/main/main';
import { initalizeNavBar } from './components/navbar/init';
import { PubSub } from './generic/pubSub';

const runApp = function (appRoot) {
  const topics = {
    projects: new PubSub(),
    todos: new PubSub(),
  };

  const appState = initAppState();
  const appView = new AppView(
    appRoot,
    new Main(),
    initalizeNavBar(appState.projectStorage.getAllProjects(), topics.projects),
  );

  appView.render();
};

const appRoot = document.querySelector('#todo-list-app');
runApp(appRoot);
