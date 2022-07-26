import { PubSub } from './pubSub';

export class PublisherModel {
  #pubSubs;

  /**
   * @param {PubSub[]} pubSubs
   */
  constructor(pubSubs = []) {
    this.#pubSubs = pubSubs;
  }

  /**
   * @param {PubSub} pubSub
   */
  add(pubSub) {
    this.#pubSubs.push(pubSub);
  }

  /**
   * @param {PubSub} pubSub
   */
  remove(pubSub) {
    this.#pubSubs = this.#pubSubs.filter(
      (existingPubSub) => existingPubSub !== pubSub,
    );
  }

  /**
   * @param {String} eventName
   * @param {Object} data event props
   */
  publish(eventName, data) {
    this.#pubSubs.forEach((pubSub) => pubSub.pub(eventName, data));
  }
}
