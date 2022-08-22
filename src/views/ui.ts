export default class UI {
  static addButton(
    title: string,
    onClickEvent: () => void, 
    parent: HTMLElement
  ) {
    const button = document.createElement('button');
    button.setAttribute('style', 'display: block');
    button.innerHTML = title;
    button.addEventListener('click', onClickEvent);
    parent.appendChild(button);
  }

  static addNumericInput(
    name: string, 
    value: number, 
    min: number,
    max: number, 
    parent: HTMLElement
  ) {
    const id = name.replace(' ','-').toLowerCase();

    const container = document.createElement('div');
    container.className = 'input-container';

    const label = document.createElement('label');
    label.innerHTML = name;
    label.setAttribute('for', id);
    container.appendChild(label);

    const input = document.createElement('input');
    input.type = 'number';
    input.id = id;
    input.min = String(min);
    input.max = String(max);
    input.value = String(value);
    container.appendChild(input);

    parent.appendChild(container);
  }
}