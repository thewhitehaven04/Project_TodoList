/** This module initializes the deafult task to show up on the first launch of the application */
import { TaskItem } from './model/taskItem';
import { prioritiesModel } from './model/priority';

export const DEFAULT_TASK = new TaskItem('Hello!', 'My first task', prioritiesModel.MODERATE, new Date());
