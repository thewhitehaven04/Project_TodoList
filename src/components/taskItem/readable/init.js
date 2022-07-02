/** This module initializes the deafult task to show up on the first launch of the application */
import { TaskItemModel } from './model/taskItem';
import { prioritiesModel } from '../../models/taskItem/priority';

export const DEFAULT_TASK = new TaskItemModel(
  'Hello!',
  'My first task',
  prioritiesModel.MODERATE,
  new Date(),
  'test',
);
