import { MapSize, WorldMap } from "../models/worldMap";
import UI from "./ui";

enum Direction {
  Up,
  Down,
  Left,
  Right
}

export class WorldMapView {

  // Public members
  static id: string = 'world-map-container';
  map: WorldMap;
  onViewUpdate: () => void;

  // Private members
  private minViewSize = 8;
  private maxViewSize = 128;
  private defaultViewSize = 16;
  private viewSize = 16;
  private viewOffset = { x: 0, y: 0 };

  constructor(mapSize: MapSize, scale: number = 1.0) {
    this.map = new WorldMap(mapSize, scale);
  }

  /* VIEW SETUP */

  render(): HTMLDivElement {
    const mapContainer = document.createElement('div');
    mapContainer.id = WorldMapView.id;

    mapContainer.appendChild(this.createMap());
    mapContainer.appendChild(this.createControls());
  
    return mapContainer;
  }

  createMap(): HTMLDivElement {
    const mapElement = document.createElement('div');
    mapElement.id = 'world-map';

    console.log(this.map.settlements);

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
        
        row.appendChild(cell);
      }
  
      mapElement.appendChild(row);
    }

    return mapElement;
  }

  createControls(): HTMLDivElement {
    const controls = document.createElement('div');
    controls.id = 'world-map-controls';

    UI.addNumericInput('Seed', this.map.seed, 0, 32768, controls);

    UI.addButton('Generate Map', () => { this.regenerateMap() }, controls);

    UI.addButton('Pan Left', () => { this.pan(Direction.Left) }, controls);
    UI.addButton('Pan Right', () => { this.pan(Direction.Right) }, controls);
    UI.addButton('Pan Down', () => { this.pan(Direction.Down) }, controls);
    UI.addButton('Pan Up', () => { this.pan(Direction.Up) }, controls);

    UI.addButton('Zoom In', () => { this.zoomIn() }, controls);
    UI.addButton('Zoom Out', () => { this.zoomOut() }, controls);
    UI.addButton('Reset Zoom', () => { this.resetZoom() }, controls);

    return controls;
  }

  /* MAP CONTROLS */
  
  regenerateMap() {
    console.log('Regenerating map...');
    this.map.seed = Number((document.getElementById('seed') as HTMLInputElement).value);
    this.map.generate() 
    this.onViewUpdate();
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
    this.onViewUpdate();
    console.log(`Pan: Delta(${delta.x}, ${delta.y}), Offset: (${this.viewOffset.x}, ${this.viewOffset.y})`);
  }

  resetZoom() {
    this.viewSize = this.defaultViewSize;
    this.onViewUpdate();
  }

  zoomIn() {
    if (this.viewSize > this.minViewSize) {
      this.viewSize /= 2.0;
      this.validateViewOffsets();
      this.onViewUpdate();
      console.log(`Zoom In (View Size: ${this.viewSize}, Min: ${this.minViewSize}, Max: ${this.maxViewSize})`);
    } else {
      console.log(`At Maximum Zoom`);
    }
  }

  zoomOut() {
    if (this.viewSize < this.maxViewSize) {
      this.viewSize *= 2.0;
      this.validateViewOffsets();
      this.onViewUpdate();
      console.log(`Zoom In (View Size: ${this.viewSize}, Min: ${this.minViewSize}, Max: ${this.maxViewSize})`);
    } else {
      console.log(`At Minimum Zoom`);
    }
  }

  validateViewOffsets() {
    // View Size = 4
    // Map Size = 6
    //
    // Offset = 0
    // |-|-|-|-|
    // |0|1|2|3|4|5|
    //
    // Offset = 1
    //   |-|-|-|-|
    // |0|1|2|3|4|5|
    //
    // Offset = 2
    //     |-|-|-|-|
    // |0|1|2|3|4|5|
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