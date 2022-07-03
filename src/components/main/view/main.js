import { createNewProjectWidget } from './widgets/createNewProject';

export class MainView {
  /** Instantiates the main view object.
   * @param {Node}
   * @param {createNewProjectWidget} widget
   * */
  main = document.createElement('main');

  constructor(widget) {
    this.currentlyDisplayedWidget = widget;
  }

  /**
   * @param {createNewProjectWidget} widget update the widget being displayed
   */
  updateWidget(widget) {
    this.currentlyDisplayedWidget = new widget();
  }

  render() {
    if (this.currentlyDisplayedWidget != null) {
      this.main.replaceChildren(this.currentlyDisplayedWidget.render());
    }
    return this.main;
  }
}
