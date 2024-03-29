import { AppView } from './app/renderApp';
import { MainController } from './components/main/main';
import { MainView } from './components/main/view/main';
import { NavBarController } from './components/navbar/controller/navbarController';
import { NavBarView } from './components/navbar/view/view';
import { PubSub } from './generic/pubSub';
import { NavBarModel } from './models/navBar/navBar';
import { ProjectStoragePubSub } from './models/projectStorage/projectStoragePublisher';

const appEventBus = new PubSub();

const defaultProjectProps = [
  {
    title: 'Default',
    checklists: [],
    tasks: [],
  },
];
const projectStorage = new ProjectStoragePubSub(
  defaultProjectProps,
  appEventBus,
);

const appRoot = document.querySelector('#todo-list-app');

/**
 * Runs the app.
 * @param {Node} appRoot
 * @param {PubSub} eventBus
 */
const runApp = function (appRoot, eventBus) {
  const projects = projectStorage.getAllProjects();
  new AppView(
    appRoot,
    new MainController(new MainView(), eventBus),
    new NavBarController(
      new NavBarModel(projects),
      new NavBarView(projects),
      eventBus,
    ),
  ).render();
};

runApp(appRoot, appEventBus);

const getProject = projectStorage.getProject;
export { getProject };
