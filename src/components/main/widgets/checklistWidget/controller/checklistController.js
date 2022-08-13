import { PubSub } from '../../../../../generic/pubSub';
import { ChecklistCreateView } from '../views/create/createNewChecklistView';
import { ChecklistUpdateView } from '../views/update/checklistUpdateView';
import { ChecklistModel } from '../../../../../models/checklist/model';
import { checklistEvents } from '../../../../../models/checklist/checklistEvents';

export class ChecklistController {
  /**
   * @param {ChecklistModel} model
   * @param {PubSub} eventBus
   */
  constructor(model, eventBus) {
    this.model = model;
    this.eventBus = eventBus;

    this.model.add(this.eventBus);
  }

  /**
   * @param {ChecklistCreateView} view
   * @returns {ChecklistController} this instance
   */
  setCreateView(view) {
    this.view = view;

    this.view.createChecklist = this.view.createChecklist.bind(
      this,
      this.initChecklist,
    );
    return this;
  }

  /**
   * @param {ChecklistUpdateView} view
   * @returns {ChecklistController} this instance
   */
  setUpdateView(view) {
    this.view = view;

    this.view.toggleComplete = this.view.toggleComplete.bind(
      this,
      this.toggleComplete,
    );
    this.view.deleteChecklist = this.view.deleteChecklist.bind(
      this,
      this.deleteChecklist,
    );

    return this;
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
    this.eventBus.pub(checklistEvents.checklistUpdated, this.model.toJSON());
  };

  deleteChecklist = () => {
    this.eventBus.pub(checklistEvents.checklistRemoved, this.model.toJSON());
  };

  render() {
    if (this.view !== undefined) {
      return this.view.render();
    } else {
      throw new ReferenceError("The view hasn't been set yet");
    }
  }
}
