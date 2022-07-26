export class Storage {
  constructor(data, namespace) {
    this.data = new Map(Object.entries(data));
    this.localStorageNamespace = namespace;
  }

  toLocalStorage(data) {
    localStorage.setItem()
  }

  getFromLocalStorage() {}

  removeFromLocalStorage() {}
}
