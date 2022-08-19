import { createNoise2D } from "../node_modules/simplex-noise/dist/esm/simplex-noise"
import { MapControls } from "./mapControls";

export enum MapSize {
  Small = 64,
  Medium = 128,
  Large = 256
}

export enum TerrainType {
  Plains = "plains",
  Mountain = "mountain",
  Water = "water"
}

/**
 * Object representing the world map data
 */
export class WorldMap {
  size: number;
  scale: number;
  terrain: TerrainType[][];
  
  // Events
  onViewUpdate: () => void;

  // View parameters
  private minViewSize = 8;
  private maxViewSize = 64;
  private defaultViewSize = 16;
  private defaultViewCellSize = 32;
  private viewSize = 16;
  private viewCellSize = 32;
  private viewOffsetX = 0;
  private viewOffsetY = 0;

  /**
   * Initializes a new instance of the world map
   * @param rows Number of rows
   * @param columns Number of columns
   * @param scale Scale used for the terrain generation function
   */
  constructor(size: number, scale: number = 0.2) {
    this.size = size;
    this.scale = scale;
    this.generate();
  }

  generate() {
    const noise = createNoise2D();
    
    this.terrain = []
    for (var y = 0; y < this.size; y++) {
      const row: TerrainType[] = [];

      for (var x = 0; x < this.size; x++) {
        const value = 0.5 * (noise(this.scale * x, this.scale * y) + 1);
        if (value > 0.80) {
          row.push(TerrainType.Mountain);
        } else if (value > 0.35) {
          row.push(TerrainType.Plains);
        } else {
          row.push(TerrainType.Water);
        }
      }
      this.terrain.push(row);
    }
  }

  view(): HTMLDivElement {
    const containerElement = document.createElement('div');
    containerElement.id = 'map';
    containerElement.className = 'map-container';

    // Add the map rows
    for(var y = this.viewOffsetY; y < Math.min(this.viewSize + this.viewOffsetY, this.size); y++) {
      const rowElement = document.createElement('div');
      rowElement.id = `map-row-${y}`;
      rowElement.className = 'map-row';
      rowElement.setAttribute('style', `height: ${this.viewCellSize}px;`);

      // Add the map cells
      for(var x = this.viewOffsetX; x < Math.min(this.viewSize + this.viewOffsetX, this.size); x++) {
        const terrain = this.terrain[y][x];
        const cellElement = document.createElement('div');
        cellElement.id = `map-cell-${y}-${x}`;
        cellElement.className = `map-cell ${terrain}`;
        cellElement.setAttribute('style', `display: inline-block; width: ${this.viewCellSize}px; height: ${this.viewCellSize}px;`);
        //cellElement.innerHTML = `${y}-${x}`;
        cellElement.onclick = () => console.log(terrain);
        rowElement.appendChild(cellElement);
      }
  
      containerElement.appendChild(rowElement);
    }

    // Append the map controls
    containerElement.appendChild(MapControls(this));
  
    return containerElement;
  }

  getViewOffsetX(): number {
    return this.viewOffsetX;
  }

  getViewOffsetY(): number {
    return this.viewOffsetY;
  }

  setViewOffsetX(x: number) {
    if (x >= 0 && x <= (this.size - this.viewSize)) {
      this.viewOffsetX = x;
      this.onViewUpdate();
    }
  }

  setViewOffsetY(y: number) {
    if (y >= 0 && y <= (this.size - this.viewSize)) {
      this.viewOffsetY = y;
      this.onViewUpdate();
    }
  }

  resetZoom() {
    this.viewSize = this.defaultViewSize;
    this.viewCellSize = this.defaultViewCellSize;
    this.onViewUpdate();
  }

  zoomIn() {
    if (this.viewSize > this.minViewSize) {
      this.viewSize /= 2.0;
      this.viewCellSize *= 2.0;
      this.onViewUpdate();
    }
  }

  zoomOut() {
    if (this.viewSize < this.maxViewSize) {
      this.viewSize *= 2.0;
      this.viewCellSize /= 2.0;
      this.onViewUpdate();
    }
  }
}