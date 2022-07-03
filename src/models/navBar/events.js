import { AppEvent } from './../../generic/event';
class ProjectAddedEvent extends AppEvent {
  constructor(project) {
    super('ProjectAddedEvent');
    this.project = project;
  }
}

class ProjectRemovedEvent extends AppEvent {
  constructor(project) {
    super('ProjectRemovedEvent');
    this.project = project;
  }
}

export { ProjectAddedEvent, ProjectRemovedEvent };
