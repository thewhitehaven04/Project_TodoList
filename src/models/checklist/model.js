/**
 * @typedef {Object} ChecklistProps
 * @property {String[]} items
 * @property {Number} progress
 */

import { PublisherModel } from '../../generic/modelPublisher';

export class ChecklistModel extends PublisherModel {
  #maxProgress;
  #progress;
  /**
   *
   * @param {ChecklistProps} checklistProps
   */
  constructor(checklistProps) {
    super();
    this.checklistItems = checklistProps.items;
    this.#progress = checklistProps.progress ?? 0;
    this.#maxProgress = this.checklistItems.length;
  }

  /** Add a task to the checklist and increment the checklist item count
   * @param {String} item
   */
  addTask(item) {
    this.tasks.push(item);
    this.#maxProgress++;
    this.publish('checklistItemAddedEvent', {
      item: item,
    });
  }

  /** Remove a task from the checklist and decermeent the checklist item count
   * @param {String} item
   */
  removeTask(item) {
    this.tasks = this.tasks.filter((checklistItem) => checklistItem != item);
    this.#maxProgress--;

    this.publish('checklistItemRemovedEvent', {
      item: item,
    });
  }

  /** Advance checklist progress up one item */
  advance() {
    if (this.#progress < this.#maxProgress) {
      this.#progress++;
    } else {
      throw new Error('This checklist has already been completed.');
    }
  }

  /**
   * @returns {ChecklistProps} checklistProps
   */
  toJSON() {
    return {
      items: Array.from(this.tasks),
      progress: this.#progress,
    };
  }
}
