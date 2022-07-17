/**
 * @typedef ProgressModel
 * @type {Object}
 * @property {ProgressInstance} NOT_STARTED
 * @property {ProgressInstance} COMPLETE
 */

/**
 * @typedef ProgressInstance
 * @type {Object}
 * @property {String} name
 * @property {String} displayName
 */
/**
 * @type {ProgressModel} 
 */
export const progressModel = Object.freeze({
  NOT_STARTED: {
    name: 'notStarted',
    displayName: 'Not started',
  },
  COMPLETE: {
    name: 'complete',
    displayName: 'Complete',
  },
});
