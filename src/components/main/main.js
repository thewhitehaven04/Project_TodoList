import { AppEvent } from '../../generic/event';
import { MainView } from './view/main';
import { PubSub } from '../../generic/pubSub';
import { EventWidgetMapper } from '../../models/main/eventWidgetMapperModel.js';

export class MainController {
  /**
   * Initialize main pane controller
   * @param {MainView} view view instance
   * @param {PubSub} globalPs PubSub instance that handles communication between the
   * main pane and the navbar
   * @param {EventWidgetMapper} eventWidgetMapper event to widgets mapper
   * */
  constructor(view, globalPs, eventWidgetMapper) {
    this.view = view;
    this.eventWidgetMapper = eventWidgetMapper;
    globalPs.subscribe(this.handleEvent);
  }

  /** Calls the view to display the widget mapped to an event in the eventMapper
   * @param {AppEvent} event
   */
  handleEvent = (event) => {
    const widget = this.eventWidgetMapper.getWidgetForEvent(event);
    this.view.updateWidget(widget);
    this.render();
  };

  /** Renders the main pane */
  render() {
    return this.view.render();
  }
}
