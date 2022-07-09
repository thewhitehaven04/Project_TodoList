import { AppView } from './app/renderApp';
import { MainController } from './components/main/main';
import { MainView } from './components/main/view/main';
import { initNavBar } from './components/navbar/init';
import { PubSub } from './generic/pubSub';
import { ProjectStorage } from './models/projectStorage/model';

const runApp = function (/** @type {Node} */ appRoot) {
  const appEventBus = new PubSub();
  const projectStorage = new ProjectStorage([], appEventBus);
  const appView = new AppView(
    appRoot,
    new MainController(new MainView(), appEventBus),
    initNavBar(
      projectStorage.getProjects().map((project) => project.title),
      appEventBus,
    ),
  );

  appView.render();
};

const appRoot = document.querySelector('#todo-list-app');
runApp(appRoot);
