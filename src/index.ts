import { WorldMapView } from "./views/worldMapView";
import { UI } from "./views/ui";

// Setup root element that will hold all other elements
const rootView = UI.container('root');
document.body.appendChild(rootView);

const navView = UI.container('root-nav');
rootView.appendChild(navView);

const contentView = UI.container('root-content');
rootView.appendChild(contentView);

const mapView = new WorldMapView(64, 0.04, contentView);
mapView.render();