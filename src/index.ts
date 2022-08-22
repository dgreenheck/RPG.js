import { MapSize } from "./models/worldMap";
import { WorldMapView } from "./views/worldMapView";

// Setup root element that will hold all other elements
const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

const rootNav = document.createElement('div');
rootNav.id = 'root-nav';
root.appendChild(rootNav);

const rootContent = document.createElement('div');
rootContent.id = 'root-content';
root.appendChild(rootContent);

const map = new WorldMapView(MapSize.Large, 0.04);
map.onViewUpdate = () => { renderMap() };
renderMap();

export function renderMap() {
  if (document.getElementById(WorldMapView.id)) {
    rootContent.replaceChild(map.render(), document.getElementById(WorldMapView.id));
  } else {
    rootContent.appendChild(map.render());
  }
}