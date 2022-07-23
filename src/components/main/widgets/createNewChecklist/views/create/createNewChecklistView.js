import { createRequiredInputOfType } from '../../../../../../domUtils/input/input';

export class ChecklistCreateView {
  widgetRoot = document.createElement('article');
  checklistItemsRoot = document.createElement('ul');

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
   * @param {import('../../../../../../models/checklist/model').ChecklistProps} props
   */
  createChecklist(handler, title, items) {
    handler(title, items);
  }

  /** Hide all elements */
  hide() {
    this.widgetRoot.replaceChildren();
  }

  render() {
    const checklistTitle = createRequiredInputOfType('text', 'Name');
    const checklistTitleElement = checklistTitle.render();

    const addChecklistItemButton = document.createElement('button');
    addChecklistItemButton.type = 'button';
    addChecklistItemButton.textContent = '+';
    this.checklistItemsRoot.appendChild(this.#renderItem());

    addChecklistItemButton.addEventListener('click', () =>
      this.checklistItemsRoot.appendChild(this.#renderItem()),
    );

    const createChecklistButton = document.createElement('button');
    createChecklistButton.type = 'button';
    createChecklistButton.textContent = 'Create';

    createChecklistButton.addEventListener('click', () => {
      // @ts-ignore
      this.createChecklist(
        checklistTitle.getValue(),
        this.#getTextareaValues(),
      );
      this.hide();
    });

    this.widgetRoot.append(
      ...[
        checklistTitleElement,
        this.checklistItemsRoot,
        addChecklistItemButton,
        createChecklistButton,
      ],
    );
    return this.widgetRoot;
  }
}
