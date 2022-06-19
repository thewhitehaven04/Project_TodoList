/** This module initializes app state for the first run  */
import { initializeStorage } from "./project/init"
import { DEFAULT_TASK } from "./taskItem/init";


export function init() {
  return initializeStorage(DEFAULT_TASK); 
}