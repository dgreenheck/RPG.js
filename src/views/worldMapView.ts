import { MapSize, WorldMap } from "../models/worldMap";

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

    // Add the map rows
    for(var y = this.viewOffset.y; y < this.viewSize + this.viewOffset.y; y++) {
      const row = document.createElement('div');
      row.id = `world-map-row-${y}`;
      row.className = 'world-map-row';

      // Add the map cells
      for(var x = this.viewOffset.x; x < Math.min(this.viewSize + this.viewOffset.x, this.map.size); x++) {
        const terrain = this.map.terrain[y][x];
        const cell = document.createElement('div');
        cell.id = `world-map-cell-${y}-${x}`;
        cell.className = `world-map-cell ${terrain}`;
        //cellElement.innerHTML = `${y}-${x}`;
        cell.onclick = () => console.log(terrain);
        row.appendChild(cell);
      }
  
      mapElement.appendChild(row);
    }

    return mapElement;
  }

  createControls(): HTMLDivElement {
    const controls = document.createElement('div');
    controls.id = 'world-map-controls';

    controls.appendChild(this.createButton(
      'Generate Map',
      () => { this.map.generate() }));

    controls.appendChild(this.createButton(
      'Pan Left',
      () => { this.panLeft() }));

    controls.appendChild(this.createButton(
      'Pan Right', 
      () => { this.panRight() }));
    
    controls.appendChild(this.createButton(
      'Pan Down', 
      () => { this.panDown() }));

    controls.appendChild(this.createButton(
      'Pan Up',  
      () => { this.panUp() }));

    controls.appendChild(this.createButton(
      'Zoom In', 
      () => { this.zoomIn() }));

    controls.appendChild(this.createButton(
      'Zoom Out',
      () => { this.zoomOut() }));
    controls.appendChild(this.createButton(
      'Reset Zoom',
      () => { this.resetZoom() }));
    
    return controls;
  }
  
  createButton(title: string, onClickEvent: () => void): HTMLButtonElement {
    const button = document.createElement('button');
    button.setAttribute('style', 'display: block');
    button.innerHTML = title;
    button.addEventListener('click', onClickEvent);
    button.addEventListener('click', this.onViewUpdate);
    return button
  }

  /* MAP CONTROLS */
  
  panLeft() {
    this.viewOffset.x--;
    this.validateViewOffsets();
  }

  panRight() {
    this.viewOffset.x++;
    this.validateViewOffsets();
  }

  panUp() {
    this.viewOffset.y--;
    this.validateViewOffsets();
  }

  panDown() {
    this.viewOffset.y++;
    this.validateViewOffsets();
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
    }
  }

  zoomOut() {
    if (this.viewSize < this.maxViewSize) {
      this.viewSize *= 2.0;
      this.validateViewOffsets();
      this.onViewUpdate();
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