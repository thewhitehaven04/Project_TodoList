import { AppView } from './app/renderApp';
import { MainController } from './components/main/main';
import { MainView } from './components/main/view/main';
import { NavBarFacade } from './components/navbar/facade';
import { PubSub } from './generic/pubSub';
import { ProjectStorageFacade } from './models/projectStorage/facade';

const appEventBus = new PubSub();
const appRoot = document.querySelector('#todo-list-app');
const projectStorage = new ProjectStorageFacade([], appEventBus);

const runApp = function (appRoot, eventBus) {
  new AppView(
    appRoot,
    new MainController(new MainView(), eventBus),
    new NavBarFacade(projectStorage.getAllProjects(), eventBus),
  ).render();
};

runApp(appRoot, appEventBus);

const getProject = projectStorage.getProject;

export { getProject };
