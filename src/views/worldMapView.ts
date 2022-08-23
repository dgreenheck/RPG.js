import { WorldMap } from "../models/worldMap";
import UI from "./ui";

enum Direction {
  Up,
  Down,
  Left,
  Right
}

export class WorldMapView {

  // Public members
  map: WorldMap;
  root: HTMLElement
  
  // Private members
  private minViewSize = 8;
  private maxViewSize = 128;
  private defaultViewSize = 16;
  private viewSize = 16;
  private viewOffset = { x: 0, y: 0 };

  constructor(size: number, scale: number = 1.0, parent: HTMLElement) {
    this.map = new WorldMap(size, scale);
    
    // Setup the containers
    this.root = UI.container('world-map-container');
    parent.append(this.root);

    this.#renderMap(false);
    this.#renderControls();
  }

  /* VIEW SETUP */

  render() {
    this.#renderMap();
  }

  #renderMap(redraw: Boolean = true) {
    const view = UI.container('world-map');

    // Add the map rows
    for(var y = this.viewOffset.y; y < this.viewSize + this.viewOffset.y; y++) {
      const row = document.createElement('div');
      row.id = `world-map-row-${y}`;
      row.className = 'world-map-row';

      // Add the map cells
      for(var x = this.viewOffset.x; x < Math.min(this.viewSize + this.viewOffset.x, this.map.size); x++) {
        const k = (y * this.map.size) + x;
        const cell = document.createElement('div');
        cell.id = `world-map-cell-${x}-${y}`;
        //cell.innerHTML = `${x},${y}`;

        if (this.map.settlements.has(k)) {
          cell.className = `world-map-cell settlement`;
          cell.onclick = () => console.log('Settlement');
        } else {
          const terrain = this.map.terrain[y][x];
          cell.className = `world-map-cell ${terrain}`;
          cell.onclick = () => console.log(terrain);
        }
        
        row.append(cell);
      }
  
      view.append(row);
    }

    if (redraw) {
      UI.redrawView(view.id, view);
    } else {
      this.root.append(view);
    }
  }

  #renderControls() {
    const view = UI.container('world-map-controls');

    view.append(UI.numericInput('Map Size', this.map.size, 16, 256));
    view.append(UI.numericInput('Seed', this.map.seed, 0, 32768));

    view.append(UI.button('Generate Map', () => { this.regenerateMap() }));

    view.append(UI.button('Pan Left', () => { this.pan(Direction.Left) }));
    view.append(UI.button('Pan Right', () => { this.pan(Direction.Right) }));
    view.append(UI.button('Pan Down', () => { this.pan(Direction.Down) }));
    view.append(UI.button('Pan Up', () => { this.pan(Direction.Up) }));

    view.append(UI.button('Zoom In', () => { this.zoomIn() }));
    view.append(UI.button('Zoom Out', () => { this.zoomOut() }));
    view.append(UI.button('Reset Zoom', () => { this.resetZoom() }));

    this.root.append(view);
  }

  /* MAP CONTROLS */
  
  regenerateMap() {
    console.log('Regenerating map...');
    this.viewSize = 16;
    this.viewOffset = { x: 0, y: 0 };
    this.map.size = Number((document.getElementById('map-size') as HTMLInputElement).value);
    this.map.seed = Number((document.getElementById('seed') as HTMLInputElement).value);
    this.map.generate() 
    this.#renderMap();
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
    this.#renderMap();
    console.log(`Pan: Delta(${delta.x}, ${delta.y}), Offset: (${this.viewOffset.x}, ${this.viewOffset.y})`);
  }

  resetZoom() {
    this.viewSize = this.defaultViewSize;
    this.#renderMap();
  }

  zoomIn() {
    if (this.viewSize > this.minViewSize) {
      this.viewSize /= 2.0;
      this.validateViewOffsets();
      this.#renderMap();
      console.log(`Zoom In (View Size: ${this.viewSize}, Min: ${this.minViewSize}, Max: ${this.maxViewSize})`);
    } else {
      console.log(`At Maximum Zoom`);
    }
  }

  zoomOut() {
    if (this.viewSize < Math.min(this.map.size, this.maxViewSize)) {
      this.viewSize *= 2.0;
      this.validateViewOffsets();
      this.#renderMap();
      console.log(`Zoom In (View Size: ${this.viewSize}, Min: ${this.minViewSize}, Max: ${this.maxViewSize})`);
    } else {
      console.log(`At Minimum Zoom`);
    }
  }

  validateViewOffsets() {
    if (this.viewOffset.x < 0) {
      console.log("Reached end of map")
      this.viewOffset.x = 0;
    } else if (this.viewOffset.x > (this.map.size - this.viewSize)) {
      console.log("Reached end of map")
      this.viewOffset.x = this.map.size - this.viewSize;
    }

    if (this.viewOffset.y < 0) {
      console.log("Reached end of map")
      this.viewOffset.y = 0;
    } else if (this.viewOffset.y > (this.map.size - this.viewSize)) {
      console.log("Reached end of map")
      this.viewOffset.y = this.map.size - this.viewSize;
    }
  }
};