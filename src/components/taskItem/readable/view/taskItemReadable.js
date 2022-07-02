export class TaskItemReadableView {
  static _styleClasses = {};

  constructor(props) {
    this.props = props;
  }

  render() {
    const viewRootArticle = document.createElement('article');

    const nameSpan = document.createElement('span');
    nameSpan.textContent = this.props.name;

    const descriptionP = document.createElement('p');
    descriptionP.textContent = this.props.description;

    const prioritySpan = document.createElement('span');
    prioritySpan.textContent = this.props.priorirty;

    const progressSpan = document.createElement('span');
    progressSpan.textContent = `Progress: ${this.props.progress}`;

    const dueDateSpan = document.createElement('span');
    dueDateSpan.textContent = `Due: ${this.props.dueDate}`;

    viewRootArticle.appendChild(nameSpan);
    viewRootArticle.appendChild(descriptionP);
    viewRootArticle.appendChild(prioritySpan);
    viewRootArticle.appendChild(progressSpan);
    viewRootArticle.appendChild(dueDateSpan);

    return viewRootArticle;
  }
}
