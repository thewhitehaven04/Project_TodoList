import { AppEvent } from './../../generic/event';

class OpenWidgetEvent extends AppEvent {
  constructor(widgetName) {
    super('OpenWidgetEvent');
    this.widgetName = widgetName;
  }
}

const EVENT_NEW_PROJECT_OPEN_WIDGET = new OpenWidgetEvent('projectNewForm');
export { EVENT_NEW_PROJECT_OPEN_WIDGET };
