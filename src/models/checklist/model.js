/**
 * @typedef {Object} ChecklistProps
 * @property {String} [id] item id to be used as a key in the checklist storage
 * @property {String} title checklist name
 * @property {Object.<string, ChecklistItem>} items (uuid, Checklist) item map of checklist item descriptions
 * @property {Number} progress number of checklist items completed
 */

/**
 * @typedef {Object} ChecklistItem
 * @property {String} itemText checklist item description
 * @property {Boolean} isComplete item completion state
 */

import { v4 as uuidv4 } from 'uuid';
import { PublisherModel } from '../../generic/modelPublisher';
import { checklistEvents } from './checklistEvents';

export class ChecklistModel extends PublisherModel {
  #maxProgress;
  #progress;
  /**
   * @param {ChecklistProps} checklistProps
   */
  constructor(
    checklistProps = {
      title: '',
      items: {},
      progress: 0,
    },
  ) {
    super();
    this.id = checklistProps.id ?? uuidv4();
    this.title = checklistProps.title;
    this.items = new Map(Object.entries(checklistProps.items));
    this.#progress = checklistProps.progress;
    this.#maxProgress = this.items.size;
  }

  /**
   * Update checklist state (title and item properties)
   * @param {String} title
   * @param {String[]} items
   */
  init(title, items) {
    if (title.trimEnd().length > 0) {
      this.title = title;
    } else {
      throw new Error('Checklist title must not be neither empty nor null.');
    }

    this.items = new Map(
      items.map((item) => [uuidv4(), { itemText: item, isComplete: false }]),
    );
    this.#progress = 0;
    this.#maxProgress = this.items.size;
    this.publish(checklistEvents.checklistCreated, this.toJSON());
  }

  /**
   * @param itemId checklistItemProps
   */
  toggleComplete(itemId) {
    const currentProps = this.items.get(itemId);
    if (currentProps !== undefined) {
      currentProps.isComplete = !currentProps?.isComplete;
      // count how many items are complete
      this.#progress = Array.from(this.items.entries()).filter(
        (item) => item[1].isComplete === true,
      ).length;
    } else {
      throw new Error(`The entity with id ${itemId} does not exist.`);
    }
    this.publish(checklistEvents.checklistUpdated, this.toJSON());
  }

  /**
   * @returns {ChecklistProps} checklistProps
   */
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      items: Object.fromEntries(this.items),
      progress: this.#progress,
    };
  }
}
