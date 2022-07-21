import { PubSub } from '../../../../generic/pubSub';
import { ChecklistModel } from '../../../../models/checklist/model';

class ChecklistController {
  /**
   *
   * @param {ChecklistView} view
   * @param {ChecklistModel} model
   * @param {PubSub} eventBus
   */
  constructor(view, model, eventBus) {
    this.view = view;
    this.model = model;
    this.eventBus = eventBus;

    this.localEventBus = new PubSub();
    this.model.add(this.localEventBus);
    this.localEventBus.subscribe(this.view.addItem);

    this.view.updateProgress.bind(this, this.updateProgress);
  }

  updateProgress() {
    this.model.advance();
  }
}
