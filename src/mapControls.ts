import { WorldMap } from "./worldMap";

export function MapControls(map: WorldMap): HTMLDivElement {
  const container = document.createElement('div');
  
  createButton('Generate Map', () => { map.generate() }, container);
  createButton('Pan Left', () => { map.setViewOffsetX(map.getViewOffsetX() - 1) }, container);
  createButton('Pan Right', () => { map.setViewOffsetX(map.getViewOffsetX() + 1) }, container);
  createButton('Pan Down', () => { map.setViewOffsetY(map.getViewOffsetY() + 1) }, container);
  createButton('Pan Up',  () => { map.setViewOffsetY(map.getViewOffsetY() - 1) }, container);
  createButton('Zoom In', () => { map.zoomIn() }, container);
  createButton('Zoom Out', () => { map.zoomOut() }, container);
  createButton('Reset Zoom', () => { map.resetZoom() }, container);
  
  return container;
}

function createButton(
  title: string, 
  onClickEvent: () => void, 
  parent: HTMLElement
) {
  const button = document.createElement('button');
  button.innerHTML = title;
  button.addEventListener('click', onClickEvent);
  button.addEventListener('click', () => { console.log(title) });
  parent.appendChild(button);
}