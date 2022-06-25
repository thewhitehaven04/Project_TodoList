import { init } from "./app/init";
import { AppView } from "./app/renderApp";
import { Main } from "./components/main/main";
import {}

const appRoot = document.querySelector('#todo-list-app');

const runApp = function () {
  initAppState();
  
  new AppView()
}

runApp();