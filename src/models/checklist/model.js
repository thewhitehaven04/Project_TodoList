/**
 * @typedef {Object} ChecklistProps
 * @property {String} title
 * @property {String[]} items
 * @property {Number} progress
 */
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
      items: [],
      progress: 0,
    },
  ) {
    super();
    this.title = checklistProps.title;
    this.items = checklistProps.items;
    this.#progress = checklistProps.progress;
    this.#maxProgress = this.checklistItems.length;
  }

  /** Add a task to the checklist and increment the checklist item count
   * @param {String} item
   */
  addTask(item) {
    this.checklistItems.push(item);
    this.#maxProgress++;
    this.publish(checklistEvents.checklistItemAdded, this.toJSON());
  }

  /** Remove a task from the checklist and decrement the checklist item count
   * @param {String} item
   */
  removeTask(item) {
    this.checklistItems = this.checklistItems.filter(
      (checklistItem) => checklistItem != item,
    );
    this.#maxProgress--;

    this.publish(checklistEvents.checklistItemRemoved, this.toJSON());
  }

  /**
   * Update checklist state (title and item properties)
   * @param {ChecklistProps} checklistProps
   */
  update(checklistProps) {
    if (checklistProps.title !== '' && checklistProps !== undefined) {
      this.title = checklistProps.title;
    } else {
      throw new Error('Checklist title must not be empty or null');
    }

    this.checklistItems = checklistProps.items;
    this.publish(checklistEvents.checklistUpdated, this.toJSON());
  }

  /** Advance checklist progress up one item */
  advance() {
    if (this.#progress < this.#maxProgress) {
      this.#progress++;
    } else {
      throw new Error('This checklist has already been completed.');
    }
    this.publish(checklistEvents.checklistUpdated, this.toJSON());
  }

  /**
   * @returns {ChecklistProps} checklistProps
   */
  toJSON() {
    return {
      title: this.title,
      items: Array.from(this.items),
      progress: this.#progress,
    };
  }
}
