import { PubSub } from '../../../../../generic/pubSub';
import { checklistEvents } from '../../../../../models/checklist/checklistEvents';
import { ChecklistCreateView } from '../views/createNewChecklistView';
import { ChecklistModel } from '../../../../../models/checklist/model';

export class ChecklistController {
  /**
   * @param {ChecklistModel} model
   * @param {ChecklistCreateView | ChecklistUpdateView} view
   * @param {PubSub} eventBus
   */
  constructor(model, view, eventBus) {
    this.view = view;
    this.model = model;
    this.eventBus = eventBus;

    this.localEventBus = new PubSub();
    this.model.add(this.localEventBus);
    this.localEventBus.subscribe(
      checklistEvents.checklistUpdated,
      this.view.addItem,
    );

    this.view.updateProgress.bind(this, this.updateProgress);
  }

  updateProgress = () => this.model.advance();
  
  /**
   * @param {import('../../../../../models/checklist/model').ChecklistProps} props 
   */
  updateChecklist = (props) => this.model.update(props)

  render() {
    return this.view.render();
  }
}
