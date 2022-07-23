import { v4 as uuidv4 } from 'uuid';
import { ChecklistModel } from '../checklist/model';

export class ChecklistStorage {
  /**
   * @param {import("../checklist/model").ChecklistProps[]} checklists
   */
  constructor(checklists = []) {
    this.checklists = new Map(
      checklists.map((checklist) => [uuidv4(), new ChecklistModel(checklist)]),
    );
  }

  /**
   * @param {import('../checklist/model').ChecklistProps} checklistProps
   */
  addChecklist(checklistProps) {
    const checklistId = uuidv4();
    this.checklists.set(checklistId, new ChecklistModel(checklistProps));
    return checklistId;
  }

  /**
   *
   * @param {*} checklistId
   */
  getChecklist(checklistId) {
    return this.checklists.get(checklistId);
  }
}
