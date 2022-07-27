/**
 *
 * @param {String} name select element name attribute
 * @param {String} id select element id attrbute
 * @param {Object} options
 */
export function createSelectWithOptions(name, id, options) {
  const select = document.createElement('select');
  select.id = id;
  select.name = name;

  for (const option in options) {
    const optionElement = document.createElement('option');
    optionElement.value = option;
    optionElement.textContent = options[option];
    select.appendChild(optionElement);
  }

  return select;
}
