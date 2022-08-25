import { WorldMap } from "../models/worldMap";
import { BaseView, UI } from "./ui";

enum Direction {
  Up,
  Down,
  Left,
  Right
}

export class WorldMapView extends BaseView {

  static rootId = 'world-map-container';
  static mapElementId = 'world-map';

  worldMap: WorldMap;
  minViewSize = 8;
  maxViewSize = 128;
  defaultViewSize = 16;
  viewSize = 16;
  viewOffset = { x: 0, y: 0 };

  // Inherited members
  parentView: BaseView;
  rootElement: HTMLElement

  /**
   * Creates a new world map view and adds it to the parent.
   * @param worldMap World map data model
   * @param parentView The parent view that will contain the root element of this view.
   */
  constructor(worldMap: WorldMap, parentView: BaseView) {
    super(WorldMapView.rootId, parentView);
    this.worldMap = worldMap;
    this.setup();
  }

  setup() {
    this.rootElement.append(this.mapView());
    this.rootElement.append(this.mapControlsView());
  }

  render() {
    UI.redrawView(WorldMapView.mapElementId, this.mapView());
  }

  mapView() {
    const view = UI.container('world-map');

    // Add the map rows
    for(var y = this.viewOffset.y; y < this.viewSize + this.viewOffset.y; y++) {
      const row = document.createElement('div');
      row.id = `world-map-row-${y}`;
      row.className = 'world-map-row';

      // Add the map cells
      for(var x = this.viewOffset.x; x < Math.min(this.viewSize + this.viewOffset.x, this.worldMap.size); x++) {
        const k = (y * this.worldMap.size) + x;
        const cell = document.createElement('div');
        cell.id = `world-map-cell-${x}-${y}`;
        //cell.innerHTML = `${x},${y}`;

        if (this.worldMap.settlements.has(k)) {
          cell.className = `world-map-cell settlement`;
          cell.onclick = () => console.log('Settlement');
        } else {
          const terrain = this.worldMap.terrain[y][x];
          cell.className = `world-map-cell ${terrain}`;
          cell.onclick = () => console.log(terrain);
        }
        
        row.append(cell);
      }
  
      view.append(row);
    }

    return view;
  }

  mapControlsView(): HTMLElement {
    const view = UI.container('world-map-controls');

    view.append(UI.numericInput('Map Size', this.worldMap.size, 16, 256));
    view.append(UI.numericInput('Seed', this.worldMap.seed, 0, 32768));

    view.append(UI.button('Generate Map', () => { this.regenerateMap() }));

    view.append(UI.button('Pan Left', () => { this.pan(Direction.Left) }));
    view.append(UI.button('Pan Right', () => { this.pan(Direction.Right) }));
    view.append(UI.button('Pan Down', () => { this.pan(Direction.Down) }));
    view.append(UI.button('Pan Up', () => { this.pan(Direction.Up) }));

    view.append(UI.button('Zoom In', () => { this.zoomIn() }));
    view.append(UI.button('Zoom Out', () => { this.zoomOut() }));
    view.append(UI.button('Reset Zoom', () => { this.resetZoom() }));

    view.append(UI.spacer());

    return view;
  }

  /* MAP CONTROLS */
  
  regenerateMap() {
    console.log('Regenerating map...');
    this.viewSize = 16;
    this.viewOffset = { x: 0, y: 0 };
    this.worldMap.size = Number((document.getElementById('map-size') as HTMLInputElement).value);
    this.worldMap.seed = Number((document.getElementById('seed') as HTMLInputElement).value);
    this.worldMap.generate() 
    this.render();
  }

  pan(direction: Direction) {
    let delta = {x: 0, y: 0};
    switch (direction) {
      case Direction.Left:
        delta.x = -this.viewSize / this.minViewSize; break;
      case Direction.Right:
        delta.x = this.viewSize / this.minViewSize; break;
      case Direction.Up:
        delta.y = -this.viewSize / this.minViewSize; break;
      case Direction.Down:
        delta.y = this.viewSize / this.minViewSize; break;
    }

    this.viewOffset.x += delta.x;
    this.viewOffset.y += delta.y;
    
    this.validateViewOffsets();
    this.render();
    console.log(`Pan: Delta(${delta.x}, ${delta.y}), Offset: (${this.viewOffset.x}, ${this.viewOffset.y})`);
  }

  resetZoom() {
    this.viewSize = this.defaultViewSize;
    this.render();
  }

  zoomIn() {
    if (this.viewSize > this.minViewSize) {
      this.viewSize /= 2.0;
      this.validateViewOffsets();
      this.render();
      console.log(`Zoom In (View Size: ${this.viewSize}, Min: ${this.minViewSize}, Max: ${this.maxViewSize})`);
    } else {
      console.log(`At Maximum Zoom`);
    }
  }

  zoomOut() {
    if (this.viewSize < Math.min(this.worldMap.size, this.maxViewSize)) {
      this.viewSize *= 2.0;
      this.validateViewOffsets();
      this.render();
      console.log(`Zoom In (View Size: ${this.viewSize}, Min: ${this.minViewSize}, Max: ${this.maxViewSize})`);
    } else {
      console.log(`At Minimum Zoom`);
    }
  }

  validateViewOffsets() {
    if (this.viewOffset.x < 0) {
      console.log("Reached end of map")
      this.viewOffset.x = 0;
    } else if (this.viewOffset.x > (this.worldMap.size - this.viewSize)) {
      console.log("Reached end of map")
      this.viewOffset.x = this.worldMap.size - this.viewSize;
    }

    if (this.viewOffset.y < 0) {
      console.log("Reached end of map")
      this.viewOffset.y = 0;
    } else if (this.viewOffset.y > (this.worldMap.size - this.viewSize)) {
      console.log("Reached end of map")
      this.viewOffset.y = this.worldMap.size - this.viewSize;
    }
  }
};