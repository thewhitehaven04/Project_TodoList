import { add } from 'lodash';
import { createRequiredInputOfType } from '../../../../../domUtils/input/input';
import { createNamedTextarea } from '../../../../../domUtils/textarea/textarea';

export class ChecklistCreateView {
  checklistItemsRoot = document.createElement('ul');
  /**
   * @param {import("../../../../../models/checklist/model").ChecklistProps} checklistProps
   */

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

  /**
   * @param {import('../../../../../models/checklist/model').ChecklistProps} props
   */
  createChecklist = (handler, props) => handler(props);

  render() {
    const root = document.createElement('article');
    const checklistTitle = createRequiredInputOfType('text', 'Name');
    const checklistTitleElement = checklistTitle.render();

    const addChecklistItemButton = document.createElement('button');
    addChecklistItemButton.type = 'button';
    addChecklistItemButton.textContent = '+';

    addChecklistItemButton.addEventListener('click', () =>
      this.checklistItemsRoot.appendChild(this.#renderItem()),
    );

    const createChecklistButton = document.createElement('button');
    createChecklistButton.type = 'button';
    createChecklistButton.textContent = 'Create';

    createChecklistButton.addEventListener('click', () => {
      // @ts-ignore
      this.createChecklist({
        title: checklistTitle.getValue(),
        items: Array.from(
          this.checklistItemsRoot.querySelectorAll('textarea'),
        ).map((textarea) => textarea.value),
      });
    });

    root.append(
      ...[
        checklistTitleElement,
        this.checklistItemsRoot,
        addChecklistItemButton,
        createChecklistButton,
      ],
    );
    return root;
  }
}
