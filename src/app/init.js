/** This module initializes app state for the first run  */
import { initializeStorage } from './../components/project/init';
import { initalizeNavBar } from '../components/navbar/init';
import { DEFAULT_TASK } from './../components/taskItem/init';
import { prioritiesModel } from './../components/taskItem/model/priority';
import { TaskItem } from './../components/taskItem/model/taskItem';

const task1 = new TaskItem('Test task', 'test task', prioritiesModel.MAJOR, new Date(2023, 1, 1));
const task2 = new TaskItem(
  'Test task 2',
  'task test 2',
  prioritiesModel.MINOR,
  new Date(2022, 5, 9),
);

/**
 * Initializes app state.
 */
export function initAppState() {
  const storage = initializeStorage(DEFAULT_TASK, task1, task2);
  initalizeNavBar(storage.getAllProjects());
}
