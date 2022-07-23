import style from './style.css';

export class ChecklistUpdateView {
  widgetRoot = document.createElement('article');
  checklistItemList = document.createElement('ul');
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

  /**
   * @param {import("../../../../../../models/checklist/model").ChecklistItem} checklistItemProps
   */
  updateChecklist = (handler, checklistItemProps) => {
    handler(checklistItemProps);
  };

  render() {
    for (let item in this.props.items) {
      const liItem = this.#renderChecklistItem(
        this.props.items[item].itemText,
        this.props.items[item].isComplete,
      );

      this.checklistItemList.appendChild(liItem);
      this.domElementToChecklistPropsMap.set(item, liItem);
    }

    this.checklistItemList.addEventListener('click', (event) => {
      if (event.target.closest('li')) {
        // @ts-ignore
        const props = this.domElementToChecklistPropsMap.get(event.target);
        this.updateChecklist(
          this.domElementToChecklistPropsMap.get(event.target),
        );
      }
    });

    this.widgetRoot.appendChild(this.checklistItemList);
    return this.widgetRoot;
  }

  hide() {
    this.widgetRoot.replaceChildren();
  }
}
