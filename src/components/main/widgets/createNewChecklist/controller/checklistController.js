import { PubSub } from '../../../../../generic/pubSub';
import { ChecklistCreateView } from '../views/create/createNewChecklistView';
import { ChecklistUpdateView } from '../views/update/checklistUpdateView';
import { ChecklistModel } from '../../../../../models/checklist/model';
import { checklistEvents } from '../../../../../models/checklist/checklistEvents';

export class ChecklistController {
  /**
   * @param {ChecklistModel} model
   * @param {(ChecklistCreateView | ChecklistUpdateView)} view
   * @param {PubSub} eventBus
   */
  constructor(model, view, eventBus) {
    this.view = view;
    this.model = model;
    this.eventBus = eventBus;

    this.model.add(this.eventBus);

    /** need to refactor the code below, currently have no idea how to
     * dynamically bind methods of different views to controller handlers
     */
    if (this.view.createChecklist !== undefined) {
      this.view.createChecklist = this.view.createChecklist.bind(
        this,
        this.initChecklist,
      );
    }
    if (this.view.toggleComplete !== undefined) {
      this.view.toggleComplete = this.view.toggleComplete.bind(
        this,
        this.toggleComplete,
      );
    }
    if (this.view.deleteChecklist !== undefined) {
      this.view.deleteChecklist = this.view.deleteChecklist.bind(
        this,
        this.deleteChecklist,
      );
    }
  }

  /**
   * @param {String} title
   * @param {String[]} items
   */
  initChecklist = (title, items) => this.model.init(title, items);

  /**
   * @param {Object<string, import('../../../../../models/checklist/model').ChecklistItem>} itemId
   */
  toggleComplete = (itemId) => {
    this.model.toggleComplete(itemId);
    this.view.updateProps(this.model.toJSON());
  };

  deleteChecklist = () => {
    this.eventBus.pub(checklistEvents.checklistRemoved, this.model.toJSON());
  };

  render() {
    return this.view.render();
  }
}
