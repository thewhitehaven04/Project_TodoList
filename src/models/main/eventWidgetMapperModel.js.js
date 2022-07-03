import { EVENT_NEW_PROJECT_OPEN_WIDGET } from '../../models/main/mainEvents.js';
import { CreateNewProjectWidgetController } from './../../components/main/widgets/createNewProjectWidgetController';
/**
 * Instances of EventWidgetMapper map events to widgets to display in the main pane.
 */
class EventWidgetMapper {
  /**
   * @param {[key, value][]} kvArray
   */
  constructor(kvArray) {
    this.map = new Map(kvArray);
  }

  /**
   * Get the widget mapped to the supplied AppEvent instance
   * @param {AppEvent} event
   * @returns {CreateNewProjectWidgetController|Object} widgetClass
   */
  getWidgetForEvent(event) {
    return this.map.get(event);
  }
}

function initMapper() {
  const eventWidgetMapper = new EventWidgetMapper([
    [EVENT_NEW_PROJECT_OPEN_WIDGET, CreateNewProjectWidgetController],
  ]);

  return eventWidgetMapper;
}

export { EventWidgetMapper, initMapper };
