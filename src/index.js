import { AppView } from './app/renderApp';
import { MainController } from './components/main/main';
import { MainView } from './components/main/view/main';
import { initNavBar } from './components/navbar/init';
import { PubSub } from './generic/pubSub';
import { pStorage } from './models/projectStorage/model';

const runApp = function (/** @type {Node} */ appRoot) {
  const appEventBus = new PubSub();
  const appView = new AppView(
    appRoot,
    new MainController(new MainView(), appEventBus),
    initNavBar(pStorage, appEventBus),
  );

  appView.render();
};

const appRoot = document.querySelector('#todo-list-app');
runApp(appRoot);
