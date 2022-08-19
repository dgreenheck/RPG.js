import { MapSize, WorldMap } from "./worldMap";

const root = document.createElement('div');
document.body.appendChild(root);

const map = new WorldMap(MapSize.Large, 0.05);
renderMap();

export function renderMap() {
  // Hook up the on view update method to re-render the map
  // This is called when the user pans the map
  map.onViewUpdate = () => { renderMap() };

  if (document.getElementById('map')) {
    root.replaceChild(map.view(), document.getElementById('map'));
  } else {
    root.appendChild(map.view());
  }
}