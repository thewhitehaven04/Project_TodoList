import { endOfToday } from 'date-fns';
import format from 'date-fns/format';
import style from './style.css';

/**
 * Returns the active active button from the supplied array.
 * @param {HTMLInputElement[]} radioArray
 * @returns
 */
function getActiveRadioOfArray(radioArray) {
  for (const radio of radioArray) {
    if (radio.checked === true) {
      return radio;
    } else continue;
  }
}

/**
 * @param {string} value value to be passed in when a radio-button is selected
 * @param {string | null} labelText displayed value
 */
function createRadioWithLabel(name, value, labelText) {
  const div = document.createElement('div');
  const radio = document.createElement('input');
  const label = document.createElement('label');

  const render = function () {
    div.classList.add('flex-radios');

    radio.type = 'radio';
    radio.id = value;
    radio.value = value;
    radio.name = name;

    label.setAttribute('for', value);
    label.textContent = labelText;

    div.append(...[radio, label]);
    return div;
  };

  const getRadio = function () {
    return radio;
  };

  return { render, getRadio };
}

/**
 * @typedef {Object} RequiredInput
 * @property {Function} render
 * @property {Function} getValue
 */

/**
 * Generate a Node of type input
 * @param {String} type input type
 * @param {String} labelText text of the input label
 * @return {RequiredInput} object
 */
function createRequiredInputOfType(type, labelText) {
  const div = document.createElement('div');
  const input = document.createElement('input');
  const span = document.createElement('span');

  /**
   *
   * @returns {HTMLDivElement}
   */
  const render = function () {
    div.classList.add('named-input');

    input.type = type;
    input.required = true;

    span.textContent = `${labelText}: `;

    div.append(...[span, input]);
    return div;
  };

  const getValue = function () {
    return input.value;
  };

  return {
    render: render,
    getValue: getValue,
  };
}

function createFutureDataPicker(labelText) {
  const div = document.createElement('div');
  const inputDate = document.createElement('input');
  const span = document.createElement('span');

  const render = function () {
    div.classList.add('named-input');

    inputDate.type = 'date';
    // inputDate.min = format(endOfToday(), 'yyyy-MM-dd');
    span.textContent = labelText;

    div.append(...[span, inputDate]);
    return div;
  };

  const getValue = function () {
    return inputDate.value;
  };

  return { render, getValue };
}

export {
  getActiveRadioOfArray,
  createRadioWithLabel,
  createRequiredInputOfType,
  createFutureDataPicker,
};
