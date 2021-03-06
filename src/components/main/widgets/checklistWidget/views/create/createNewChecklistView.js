import { createRequiredInputOfType } from '../../../../../../domUtils/input/input';

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
    checklistItem.classList.add('checklist-item');
    li.appendChild(checklistItem);
    return li;
  }

  #getTextareaValues() {
    return Array.from(
      this.checklistItemsRoot.querySelectorAll('.checklist-item'),
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

    this.addChecklistItemButton.type = 'button';
    this.addChecklistItemButton.textContent = 'Add item';
    this.checklistItemsRoot.appendChild(this.addChecklistItemButton);

    this.checklistItemsRoot.insertBefore(
      this.#renderItem(),
      this.addChecklistItemButton,
    );

    this.addChecklistItemButton.addEventListener('click', () =>
      this.checklistItemsRoot.insertBefore(
        this.#renderItem(),
        this.addChecklistItemButton,
      ),
    );

    this.createChecklistButton.type = 'button';
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
