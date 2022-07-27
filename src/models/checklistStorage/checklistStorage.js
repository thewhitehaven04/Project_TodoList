import { PubSub } from '../../generic/pubSub';
import { checklistEvents } from '../checklist/checklistEvents';

export class ChecklistStorage {
  /**
   * @param {import("../checklist/model").ChecklistProps[]} checklists
   * @param {PubSub} eventBus
   */
  constructor(checklists = [], eventBus) {
    this.checklists = new Map(
      checklists.map((checklist) => [checklist.id, checklist]),
    );
    this.eventBus = eventBus;

    this.eventBus.subscribe(
      checklistEvents.checklistCreated,
      this.addChecklist,
    );
    this.eventBus.subscribe(
      checklistEvents.checklistUpdated,
      this.updateChecklist,
    );
    this.eventBus.subscribe(
      checklistEvents.checklistRemoved,
      this.removeChecklist,
    );
  }

  /**
   * @param {import('../checklist/model').ChecklistProps} checklistProps
   */
  addChecklist = (checklistProps) => {
    this.checklists.set(checklistProps.id, checklistProps);
    this.eventBus.pub(checklistEvents.checklistAddedToStorage, checklistProps);
    return checklistProps.id;
  };

  /**
   * @param {String} checklistId
   */
  removeChecklist = (checklistId) => {
    this.eventBus.pub(
      checklistEvents.checklistRemovedFromStorage,
      this.getChecklist(checklistId),
    );
    this.checklists.delete(checklistId);
  };

  updateChecklist = (checklistProps) => {
    this.checklists.set(checklistProps.id, checklistProps);
    return checklistProps;
  };

  /**
   * @param {String} checklistId
   */
  getChecklist(checklistId) {
    return this.checklists.get(checklistId);
  }
}
