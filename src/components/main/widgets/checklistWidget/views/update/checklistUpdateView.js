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
   * @param {Boolean} isComplete
   */
  #renderChecklistItem(itemText, isComplete) {
    const liChecklistItem = document.createElement('li');
    liChecklistItem.classList.add('checklist-item');

    const spanChecklistText = document.createElement('p');
    spanChecklistText.classList.add('checklist-item-text');
    spanChecklistText.textContent = itemText;

    const checkboxChecklist = document.createElement('input');
    checkboxChecklist.type = 'checkbox';
    checkboxChecklist.checked = isComplete;

    liChecklistItem.append(...[spanChecklistText, checkboxChecklist]);
    return liChecklistItem;
  }

  /**
   * @param {import('../../../../../../models/checklist/model').ChecklistProps} props
   */
  updateProps = (props) => {
    this.props = props;
  };

  /** Updates how many items is left to complete. */
  updateProgress = () => {
    const count = Object.keys(this.props.items).length - this.props.progress
    if (count > 0) {
      this.progress.textContent = `${count} tasks left to complete`
    }
    else {
      this.progress.textContent = `You have completed all tasks!`;
    }
  };

  /**
   * @param {Function} handler
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
    this.widgetRoot.classList.add('checklist-flex');
    this.checklistItemList.classList.add('checklist-items');

    const checklistHeaderFlex = document.createElement('div');
    checklistHeaderFlex.classList.add('checklist-header-flex');
    // checklist title
    const title = document.createElement('span');
    title.textContent = this.props.title;
    title.classList.add('checklist-header');
    
    // deletes checklist
    const removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="fa-solid fa-trash"></i>'
    removeButton.addEventListener('click', () => {
      this.deleteChecklist();
      this.hide();
    });
    removeButton.classList.add('checklist-remove-button');

    // add title and remove button to checklist view header
    checklistHeaderFlex.append(...[title, removeButton]);

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


    this.widgetRoot.append(
      ...[checklistHeaderFlex, this.checklistItemList, this.progress],
    );
    return this.widgetRoot;
  }

  hide() {
    this.widgetRoot.replaceChildren();
  }
}
