import Encounter from '../models/encounter';
import { journal } from '../models/journal';
import { WorldMap } from '../models/worldMap';
import { JournalView } from './journalView';
import { BaseView, UI } from './ui';
import { WorldMapView } from './worldMapView';

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
  rootElement: HTMLElement;

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
      () => { this.switchToWorldMap(); }));

    this.rootElement.appendChild(UI.navBarButton(
      'JOURNAL', 
      () => { this.switchToJournal(); }));

    this.switchToWorldMap();
  }

  switchToWorldMap() {
    console.log('Selected World Map');
    journal.addEntry('Selected World Map');
    this.selectView(new WorldMapView(this.worldMap, this));
  }

  switchToJournal() {
    console.log('Selected Journal');
    journal.addEntry('Selected Journal');
    this.selectView(new JournalView(this));
  }

  selectView(view: BaseView) {
    this.selectedView = view;
    this.contentView.rootElement.replaceChildren(this.selectedView.rootElement);
  }
}