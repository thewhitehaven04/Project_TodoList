import { AppView } from './app/renderApp';
import { MainController } from './components/main/main';
import { MainView } from './components/main/view/main';
import { NavBarController } from './components/navbar/controller/navbarController';
import { NavBarView } from './components/navbar/view/view';
import { PubSub } from './generic/pubSub';
import { ChecklistStorage } from './models/checklistStorage/checklistStorage';
import { NavBarModel } from './models/navBar/navBar';
import { ProjectStoragePublisher } from './models/projectStorage/projectStoragePublisher';
import { TaskStoragePublisher } from './models/taskStorage/taskStoragePublisher';

const appEventBus = new PubSub();

const projectStorage = new ProjectStoragePublisher([], appEventBus);
const taskStorage = new TaskStoragePublisher(appEventBus);
const checklistStorage = new ChecklistStorage([], appEventBus);

const appRoot = document.querySelector('#todo-list-app');

/**
 * Runs app.
 * @param {Node} appRoot
 * @param {PubSub} eventBus
 */
const runApp = function (appRoot, eventBus) {
  new AppView(
    appRoot,
    new MainController(new MainView(), eventBus),
    new NavBarController(
      new NavBarModel(projectStorage.getAllProjects()),
      new NavBarView(),
      eventBus,
    ),
  ).render();
};

runApp(appRoot, appEventBus);

const getProject = projectStorage.getProject;
const getTask = taskStorage.getTask;

export { getProject, getTask };
