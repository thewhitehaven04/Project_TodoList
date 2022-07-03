import { AppView } from './app/renderApp';
import { MainController } from './components/main/main';
import { MainView } from './components/main/view/main';
import { newProjectWidget } from './components/main/view/widgets/createNewProject';
import { initNavBar } from './components/navbar/init';
import { PubSub } from './generic/pubSub';
import { initMapper } from './models/main/eventWidgetMapperModel.js';
import { pStorage } from './models/projectStorage/model';

const runApp = function (appRoot) {
  const topics = {
    fromNavBarToMain: new PubSub(),
    fromMainToNavBar: new PubSub(),
  };

  const appView = new AppView(
    appRoot,
    new MainController(new MainView(), topics.fromMainToNavBar, initMapper()),
    initNavBar(pStorage, topics.fromMainToNavBar),
  );

  appView.render();
};

const appRoot = document.querySelector('#todo-list-app');
runApp(appRoot);
