export class TaskItem {
  #taskItemRoot;
  #fields;

  constructor({ name, description, priority, progress, dueDate, tag }) {
    this.#taskItemRoot = document.createElement('article');

    this.#fields = new Map(Object.entries({ name, description, priority, progress, dueDate, tag }));
  }

  update({ name, description, priority, progress, dueDate, tag } = {}) {
    for (let key of this.#fields) {
      if (this.#fields.get(key) === key) {
        this.#fields.set(key, le);
      }
    }
  }

  render() {
    const nameSpan = document.createElement('span');
    nameSpan.textContent = this.#fields.get('name');

    const descriptionP = document.createElement('p');
    descriptionP.textContent = this.#fields.get('description');

    const prioritySpan = document.createElement('span');
    prioritySpan.textContent = this.#fields.get('priorirty');

    const progressSpan = document.createElement('span');
    progressSpan.textContent = `Progress: ${this.#fields.get('progress')}`;

    const dueDateSpan = document.createElement('span');
    dueDateSpan.textContent = `Due: ${this.#fields.get('dueDate')}`;

    this.#taskItemRoot.appendChild(nameSpan);
    this.#taskItemRoot.appendChild(descriptionP);
    this.#taskItemRoot.appendChild(Span);
    this.#taskItemRoot.appendChild(prioritySpan);
    this.#taskItemRoot.appendChild(progressSpan);
    this.#taskItemRoot.appendChild(dueDateSpan);

    return this.#taskItemRoot;
  }
}
