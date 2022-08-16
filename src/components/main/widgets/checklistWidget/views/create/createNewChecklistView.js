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
    this.widgetRoot.classList.add('checklist-grid');
    this.checklistItemsRoot.classList.add('grid-items');

    const checklistTitleElement = this.checklistTitle.render();
    checklistTitleElement.classList.add(...['grid-name', 'name-input-flex']);

    const divItemList = document.createElement('div');
    
    const divItemListHeader = document.createElement('div');
    divItemListHeader.classList.add('checklist-list-header-flex');
    const itemSectionSpan = document.createElement('span');
    itemSectionSpan.textContent = 'Checklist items';

    this.checklistItemsRoot.classList.add('checklist-items-ul');

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add(...['grid-buttons', 'buttons-container']);
    this.addChecklistItemButton.type = 'button';
    this.addChecklistItemButton.innerHTML = '<i class="fa-solid fa-plus"></i>'
    this.addChecklistItemButton.classList.add('checklist-add-item-button');

    divItemListHeader.append(...[itemSectionSpan, this.addChecklistItemButton]);
    
    divItemList.append(...[divItemListHeader, this.checklistItemsRoot]);
    
    this.checklistItemsRoot.appendChild(this.#renderItem());

    this.addChecklistItemButton.addEventListener('click', () =>
      this.checklistItemsRoot.appendChild(this.#renderItem()),
    );

    this.createChecklistButton.type = 'submit';
    this.createChecklistButton.textContent = 'Create';
    this.createChecklistButton.classList.add('checklist-create-button');

    this.createChecklistButton.addEventListener('click', () => {
      // @ts-ignore
      this.createChecklist(
        this.checklistTitle.getValue(),
        this.#getTextareaValues(),
      );
      this.hide();
    });
    buttonsContainer.appendChild(this.createChecklistButton);

    this.widgetRoot.append(
      ...[checklistTitleElement, divItemList, buttonsContainer],
    );
    return this.widgetRoot;
  }
}
