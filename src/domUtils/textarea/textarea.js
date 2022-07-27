import style from './style.css';

export function createNamedTextarea(textLabel) {
  const divContainer = document.createElement('div');
  const textarea = document.createElement('textarea');
  const span = document.createElement('span');

  const getValue = function () {
    return textarea.value;
  };

  const render = function () {
    divContainer.classList.add('named-textarea');
    span.textContent = `${textLabel}: `;

    divContainer.append(...[span, textarea]);
    return divContainer;
  };

  return { render, getValue };
}
