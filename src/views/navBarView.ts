import Encounter from "../models/encounter";
import { WorldMap } from "../models/worldMap";
import { EncounterView } from "./encounterView";
import { BaseView, UI } from "./ui";
import { WorldMapView } from "./worldMapView";

export class NavBarView extends BaseView {

  static rootId = 'nav-bar';

  // View that contains the selected view
  contentView: BaseView;
  // The currently selected view
  selectedView: BaseView;

  // Sub-views
  worldMap: WorldMap;

  // Inherited members
  parentView: BaseView;
  rootElement: HTMLElement

  /**
   * Creates a nav bar view
   * @param parentView The parent view that will contain the root element of this view.
   */
  constructor(contentView: BaseView, parentView: BaseView) {
    super(NavBarView.rootId, parentView);
    this.contentView = contentView;

    // This should go somewhere else, like a static game state
    this.worldMap = new WorldMap(64, 0.03);
    
    this.setup();
  }

  setup() {
    this.rootElement.appendChild(UI.navBarButton(
      'WORLD MAP', 
      () => { this.selectWorldMap() }));

    this.rootElement.appendChild(UI.navBarButton(
      'ENCOUNTER', 
      () => { this.selectEncounter() }));

    this.selectWorldMap();
  }

  selectWorldMap() {
    console.log("Selected World Map");
    this.selectView(new WorldMapView(this.worldMap, this));
  }

  selectEncounter() {
    console.log("Selected Encounter");
    this.selectView(new EncounterView(new Encounter(), this));
  }

  selectView(view: BaseView) {
    this.selectedView = view;
    this.contentView.rootElement.replaceChildren(this.selectedView.rootElement);
  }
}