export interface RenderComponent {
  id: string
  parentView: BaseView;
  rootElement: HTMLElement;
  setup: () => void;
  render: () => void;
}

export class BaseView implements RenderComponent {
  id: string;
  parentView: BaseView;
  rootElement: HTMLElement;

  constructor(id: string, parentView: BaseView = null) {
    this.id = id;
    this.rootElement = UI.container(this.id);
    if (document.getElementById(id)) {
      document.getElementById(id).replaceWith(this.rootElement);
      console.log(`REPLACE '${id}'`);
    } else if (parentView != null) {
      this.parentView = parentView;
      this.parentView.rootElement.appendChild(this.rootElement);
      console.log(`CHILD '${id}' TO '${this.parentView.rootElement.id}'`);
    } else {
      this.parentView = null;
      document.body.appendChild(this.rootElement);
      console.log(`CHILD '${id}' to body`);
    }
  }

  setup(): void { return; }
  render(): void { return; }
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
    button.className = 'button';
    button.innerHTML = title;
    button.addEventListener('click', onClickEvent);
    return button;
  }

  static navBarButton(title: string, onClickEvent: () => void): HTMLButtonElement {
    const button = document.createElement('button');
    button.className = 'nav-bar-button';
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

  static spacer() {
    const button = document.createElement('div');
    button.className = 'spacer';
    return button;
  }
}

