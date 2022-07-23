import { AppView } from './app/renderApp';
import { MainController } from './components/main/main';
import { MainView } from './components/main/view/main';
import { NavBarFacade } from './components/navbar/facade';
import { PubSub } from './generic/pubSub';
import { ChecklistStorage } from './models/checklistStorage/checklistStorage';
import { ProjectStoragePublisher } from './models/projectStorage/decorator';
import { TaskStoragePublisher } from './models/taskStorage/taskStoragePublisher';

const appEventBus = new PubSub();

const projectStorage = new ProjectStoragePublisher([], appEventBus);
const taskStorage = new TaskStoragePublisher(appEventBus);
const checklistStorage = new ChecklistStorage([], appEventBus);

const appRoot = document.querySelector('#todo-list-app');

const runApp = function (appRoot, eventBus) {
  new AppView(
    appRoot,
    new MainController(new MainView(), eventBus),
    new NavBarFacade(projectStorage.getAllProjects(), eventBus),
  ).render();
};

runApp(appRoot, appEventBus);

const getProject = projectStorage.getProject;
const getTask = taskStorage.getTask;

export { getProject, getTask };
