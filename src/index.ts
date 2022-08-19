import { WorldMap, HTMLWorldMapElement } from "./worldMap";

const root = document.createElement('div');
document.body.appendChild(root);

export function generateMap() {
  // Remove the existing map
  if (document.getElementById('map')) {
    root.removeChild(document.getElementById('map'));
  }
  const map = new WorldMap(10, 10, 0.2);
  root.appendChild(HTMLWorldMapElement(map));
}

const generateMapButton = document.createElement('button');
generateMapButton.innerHTML = 'Generate Map';
generateMapButton.addEventListener('click', generateMap);
root.appendChild(generateMapButton);

generateMap();