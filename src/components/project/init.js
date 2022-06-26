/** This module initailizes the default project and adds it to storage */
import { ProjectStorage } from "./model/projectStorage";
import { Project } from "./model/project";

const DEFAULT_PROJECT_NAME = 'Default';

/**
 * @param  {...any} defaultTasks 
 * @returns {ProjectStorage} projectStorage 
 */
export function initializeStorage(...defaultTasks) {
  const defaultProject = new Project(DEFAULT_PROJECT_NAME, defaultTasks);
  const projectStorage = new ProjectStorage();
  projectStorage.addProject(defaultProject);
  return projectStorage;
}