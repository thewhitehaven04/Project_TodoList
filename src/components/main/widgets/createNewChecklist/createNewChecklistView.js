export class ChecklistView {
  root = document.createElement('article');
  /**
   * @param {import("../../../../models/checklist/model").ChecklistProps} checklistProps
   */
  constructor(checklistProps) {
    this.props = checklistProps;
  }

  /**
   * Render a list item representing checklist item
   * @param {String} task
   * @param {Boolean} isEnabled
   */
  #renderItem(task, isEnabled) {
    const li = document.createElement('li');
    li.classList.add('flex-task');

    const checklistItem = document.createElement('p');
    checklistItem.textContent = task;

    const checkboxComplete = document.createElement('input');
    checkboxComplete.type = 'checkbox';
    checkboxComplete.disabled = !isEnabled;

    li.append(...[checklistItem, checkboxComplete]);
    return li;
  }

  #renderItems() {
    return this.props.items.map((item, index) => {
      const renderedItem = this.#renderItem(item, index + 1 <= this.props.progress);
    }),
  }

  addItem = (item) => {
    this.props.items.push(item);
    this.#renderTask
  }

  render() {
    this.root.append(
    );

    this.root.addEventListener('click', (event) => {
      if (event.target.matches('input[type="checkbox"]')) {
        updateProgress();
      }
    });
    return this.root;
  }


  updateProgress(handler) {
    handler();
  }
}
