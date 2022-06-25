/** This module initailizes the default project and adds it to storage */
import { ProjectStorage } from "./model/projectStorage";
import { Project } from "./model/project";
import { isToday } from "date-fns";

const DEFAULT_PROJECT_NAME = 'Default';

export function initializeStorage(...defaultTasks) {
  const defaultProject = new Project(DEFAULT_PROJECT_NAME, defaultTasks);
  const projectStorage = new ProjectStorage();
  projectStorage.addProject(defaultProject);
  return projectStorage;
}