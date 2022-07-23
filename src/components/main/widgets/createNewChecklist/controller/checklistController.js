import { PubSub } from '../../../../../generic/pubSub';
import { ChecklistCreateView } from '../views/create/createNewChecklistView';
import { ChecklistUpdateView } from '../views/update/checklistUpdateView';
import { ChecklistModel } from '../../../../../models/checklist/model';

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
    if (this.view.createChecklist !== undefined) {
      this.view.createChecklist = this.view.createChecklist.bind(
        this,
        this.initChecklist,
      );
    }
    if (this.view.updateChecklist !== undefined) {
      this.view.updateChecklist = this.view.updateChecklist.bind(
        this,
        this.updateChecklistItems,
      );
    }
  }

  /**
   * @param {String} title
   * @param {String[]} items
   */
  initChecklist = (title, items) => this.model.init(title, items);

  /**
   * @param {Object<string, import('../../../../../models/checklist/model').ChecklistItem>} props
   */
  updateChecklistItems = (props) => this.model.updateChecklistItems(props);

  render() {
    return this.view.render();
  }
}
