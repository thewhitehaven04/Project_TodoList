export class Main {
  #mainRoot;

  constructor() {
    this.#mainRoot = document.createElement('main');
  }

  render() {
    this.#mainRoot.textContent = 'Hello world!';
    return this.#mainRoot;
  }
}
