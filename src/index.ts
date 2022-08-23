import { WorldMapView } from "./views/worldMapView";

// Setup root element that will hold all other elements
const rootView = document.createElement('div');
rootView.id = 'root';
document.body.appendChild(rootView);

const navView = document.createElement('div');
navView.id = 'root-nav';
rootView.appendChild(navView);

const contentView = document.createElement('div');
contentView.id = 'root-content';
rootView.appendChild(contentView);

const mapView = new WorldMapView(64, 0.04, contentView);
contentView.append(mapView.root)
mapView.render();