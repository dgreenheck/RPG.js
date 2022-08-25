export interface RenderComponent {
  id: string
  parentView: HTMLElement;
  rootView: HTMLElement;
  setup: () => void;
  render: () => void;
}

export class BaseView implements RenderComponent {
  id: string;
  parentView: HTMLElement;
  rootView: HTMLElement;

  constructor(id: string, parentView: HTMLElement) {
    this.id = id;
    this.rootView = UI.container(this.id);
    this.parentView = parentView;
    this.parentView.appendChild(this.rootView);
  }

  setup() {}
  render() {}
  getRootElement(): HTMLElement { return null; }
}

export class UI {

  static redrawView(id: string, view: HTMLElement) {
    const oldView = document.getElementById(id);
    if (oldView) {
      oldView.replaceWith(view);
    }
  }

  static container(name: string): HTMLDivElement {
    const container = document.createElement('div');
    container.id = name;
    return container;
  }

  static button(title: string, onClickEvent: () => void): HTMLButtonElement {
    const button = document.createElement('button');
    button.setAttribute('style', 'display: block');
    button.innerHTML = title;
    button.addEventListener('click', onClickEvent);
    return button;
  }

  static numericInput(
    name: string, 
    value: number, 
    min: number,
    max: number
  ): HTMLDivElement {
    const id = name.replace(' ','-').toLowerCase();

    const container = document.createElement('div');
    container.className = 'input-container';

    const label = document.createElement('label');
    label.innerHTML = name;
    label.setAttribute('for', id);
    container.append(label);

    const input = document.createElement('input');
    input.type = 'number';
    input.id = id;
    input.min = String(min);
    input.max = String(max);
    input.value = String(value);
    container.append(input);

    return container;
  }
}

