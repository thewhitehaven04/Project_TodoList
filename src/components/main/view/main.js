export class MainView {
  constructor(main) {
    this.currentlyDisplayed = main;
  }

  render() {
    return this.currentlyDisplayed;
  }
}
