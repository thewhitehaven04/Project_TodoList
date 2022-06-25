class ChecklistEntry{
  #description;

  constructor(description) {
    this.#description = description;
    this.isComplete = false;
  }

  complete() {
    this.isComplete = true;
  }

  updateDescription(description) {
    this.#description = description;
  }
}