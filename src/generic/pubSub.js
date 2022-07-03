/** Implemenets the so-called "publish-subscribe" / "observer" pattern
 * @property {Function} subscribe
 * @property {Function} unsubscribe
 * @property {Function} pub
 */
export class PubSub {
  constructor() {
    this.observers = [];
  }

  /** Adds an object to the observer list */
  subscribe(observer) {
    this.observers.push(observer);
  }

  /** Removes an object from the observer list */
  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  /** Publishes an event to all subscribers */
  pub = (data) => {
    this.observers.forEach((obs) => obs(data));
  };
}
