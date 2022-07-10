/** Implemenets the so-called "publish-subscribe" / "observer" pattern
 * @property {Function} subscribe
 * @property {Function} unsubscribe
 * @property {Function} pub
 */
export class PubSub {
  constructor() {
    this.eventMap = new Map();
  }

  /** Adds an object to the observer list
   * @param {String} eventName name of an event
   * @param {Function} observer event callback function
   */
  subscribe(eventName, observer) {
    if (this.eventMap.has(eventName)) {
      this.eventMap.get(eventName).push(observer);
    } else {
      this.eventMap.set(eventName, [observer]);
    }
  }
  /**
   * Removes an object from the observer list
   * @param {String} eventName
   * @param {Function} observer
   */
  unsubscribe(eventName, observer) {
    const events = this.eventMap.get(eventName);
    this.eventMap.set(
      eventName,
      events.filter((obs) => obs != observer),
    );
  }

  /** Publishes an event to all subscribers */
  pub(eventName, data) {
    console.log(`Event published.\nEvent name: ${eventName}\nData:`);
    console.dir(data);
    this.eventMap.get(eventName).forEach((observer) => observer(data));
  }
}
