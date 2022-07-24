import style from './style.css';

export class ChecklistUpdateView {
  widgetRoot = document.createElement('article');
  checklistItemList = document.createElement('ul');
  progress = document.createElement('span');

  /**
   * @param {import("../../../../../../models/checklist/model").ChecklistProps} checklistProps
   */
  constructor(checklistProps) {
    this.props = checklistProps;
    this.domElementToChecklistPropsMap = new Map();
  }

  /**
   * Render a checklist item depending on its completion state.
   * @param {String} itemText
   */
  #renderChecklistItem(itemText, isComplete) {
    const liChecklistItem = document.createElement('li');
    liChecklistItem.classList.add('checklist-item');

    const spanChecklistText = document.createElement('span');
    spanChecklistText.textContent = itemText;

    const checkboxChecklist = document.createElement('input');
    checkboxChecklist.type = 'checkbox';
    checkboxChecklist.checked = isComplete;

    liChecklistItem.append(...[spanChecklistText, checkboxChecklist]);
    return liChecklistItem;
  }

  updateProps = (props) => {
    this.props = props;
  };

  /** Updates how many items is left to complete. */
  updateProgress = () => {
    this.progress.textContent = `${
      Object.keys(this.props.items).length - this.props.progress
    } items left`;
  };

  /**
   * @param {String} itemId
   */
  toggleComplete = (handler, itemId) => {
    handler(itemId);
    this.updateProgress();
  };

  deleteChecklist = (handler) => {
    handler();
  };

  render() {
    this.widgetRoot.classList.add('grid-checklist');
    this.checklistItemList.classList.add('checklist-items');

    const title = document.createElement('span');
    title.textContent = this.props.title;
    title.classList.add('grid-checklist-title');

    this.progress.classList.add('grid-checklist-progress');
    this.updateProgress();

    for (let item in this.props.items) {
      const liItem = this.#renderChecklistItem(
        this.props.items[item].itemText,
        this.props.items[item].isComplete,
      );

      this.checklistItemList.appendChild(liItem);
      this.domElementToChecklistPropsMap.set(liItem, item);
    }

    this.checklistItemList.addEventListener('click', (event) => {
      const closest = event.target.closest('li');
      if (closest !== undefined) {
        // @ts-ignore
        this.toggleComplete(this.domElementToChecklistPropsMap.get(closest));
      }
    });

    // deletes checklist
    const removeButton = document.createElement('button');
    removeButton.textContent = '✕';
    removeButton.addEventListener('click', () => {
      this.deleteChecklist();
      this.hide();
    });
    removeButton.classList.add('grid-close');

    this.widgetRoot.append(
      ...[title, removeButton, this.checklistItemList, this.progress],
    );
    return this.widgetRoot;
  }

  hide() {
    this.widgetRoot.replaceChildren();
  }
}
