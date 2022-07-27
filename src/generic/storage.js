export class LocalStorageAdapter {
  constructor(key) {
    this.key = key;
  }

  /** Updates local storage by saving the data by the specified key.
   * @param {Object} data
   */
  updateLocalStorage(data) {
    localStorage.setItem(this.key, JSON.stringify(data));
    console.log(`Storing to local storage:`);
    console.dir(localStorage);
  }

  /**
   * Local storage data by the key 'this.key'
   * @returns {Object|null}
   */
  getFromLocalStorage() {
    return JSON.parse(localStorage.getItem(this.key) ?? 'null');
  }
}
