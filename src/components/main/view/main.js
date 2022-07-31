/**
 * @typedef Widget
 * @property {Function} render
 */
export class MainView {
  main = document.createElement('main');

  /** Instantiates the main view object.
  @param {Widget} [widget]  
  */
  constructor(widget) {
    this.currentlyDisplayedWidget = widget ?? null;
  }

  /**
   * Updates the currently displayed widget
   * @param {Widget} widget widget to display
   */
  setWidget(widget) {
    this.currentlyDisplayedWidget = widget;
  }

  render() {
    if (this.currentlyDisplayedWidget != null) {
      this.main.replaceChildren(this.currentlyDisplayedWidget.render());
    }
    return this.main;
  }
}
