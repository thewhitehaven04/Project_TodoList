import { createRequiredInputOfType } from '../../../../../../domUtils/input/input';
import style from './style.css';

export class ChecklistCreateView {
  checklistTitle = createRequiredInputOfType('text', 'Name');
  widgetRoot = document.createElement('article');
  checklistItemsRoot = document.createElement('ul');
  addChecklistItemButton = document.createElement('button');
  createChecklistButton = document.createElement('button');

  #domElementToPropsMap;
  constructor() {
    this.#domElementToPropsMap = new Map();
  }

  /**
   * Render a list item with checklist item descripton textarea
   */
  #renderItem() {
    const li = document.createElement('li');
    const checklistItem = document.createElement('textarea');
    checklistItem.classList.add('checklist-item-textarea');
    li.appendChild(checklistItem);
    return li;
  }

  #getTextareaValues() {
    return Array.from(
      this.checklistItemsRoot.querySelectorAll('.checklist-item-textarea'),
    ).map((textarea) => textarea.value);
  }

  /**
   * @param {String} title
   * @param {import('../../../../../../models/checklist/model').ChecklistItem[]} items
   */
  createChecklist(handler, title, items) {
    handler(title, items);
  }

  /** Hide all elements */
  hide() {
    this.widgetRoot.replaceChildren();
  }

  render() {
    const checklistTitleElement = this.checklistTitle.render();

    this.checklistItemsRoot.classList.add('checklist-items-ul');

    this.addChecklistItemButton.type = 'button';
    this.addChecklistItemButton.textContent = 'Add item';
    this.widgetRoot.appendChild(this.addChecklistItemButton);

    this.checklistItemsRoot.appendChild(this.#renderItem());

    this.addChecklistItemButton.addEventListener('click', () =>
      this.checklistItemsRoot.appendChild(this.#renderItem()),
    );

    this.createChecklistButton.type = 'submit';
    this.createChecklistButton.textContent = 'Create';

    this.createChecklistButton.addEventListener('click', () => {
      // @ts-ignore
      this.createChecklist(
        this.checklistTitle.getValue(),
        this.#getTextareaValues(),
      );
      this.hide();
    });

    this.widgetRoot.append(
      ...[
        checklistTitleElement,
        this.checklistItemsRoot,
        this.createChecklistButton,
      ],
    );
    return this.widgetRoot;
  }
}
