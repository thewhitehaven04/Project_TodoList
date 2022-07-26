export class LocalStorageAdapter {
  updateLocalStorage(key, data) {
    localStorage.setItem(key, data);
  }

  getFromLocalStorage(key) {
    localStorage.getItem(key);
  }
}
