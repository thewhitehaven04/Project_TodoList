import { initAppState } from './app/init';
import { AppView } from './app/renderApp';
import { Main } from './components/main/main';
import { navBar } from './components/navbar/controller';

const appRoot = document.querySelector('#todo-list-app');

const runApp = function () {
  const appState = initAppState();
  const appView = new AppView(appRoot, new Main(), navBar);

  appView.render();
};

runApp();
