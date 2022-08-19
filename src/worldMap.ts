import { createNoise2D } from "../node_modules/simplex-noise/dist/esm/simplex-noise"

export enum TerrainType {
  Plains = "plains",
  Mountain = "mountain",
  Water = "water"
}

/**
 * Object representing the world map data
 */
export class WorldMap {
  rows: number
  columns: number
  terrain: TerrainType[][]

  /**
   * Initializes a new instance of the world map
   * @param rows Number of rows
   * @param columns Number of columns
   * @param scale Scale used for the terrain generation function
   */
  constructor(rows: number, columns: number, scale: number = 0.2) {
    const noise = createNoise2D();

    this.rows = rows;
    this.columns = columns;
    this.terrain = []
    for (var i = 0; i < this.rows; i++) {
      const row: TerrainType[] = [];

      for (var j = 0; j < columns; j++) {
        const value = 0.5 * (noise(scale * i, scale * j) + 1);
        if (value > 0.75) {
          row.push(TerrainType.Mountain);
        } else if (value > 0.25) {
          row.push(TerrainType.Plains);
        } else {
          row.push(TerrainType.Water);
        }
      }
      this.terrain.push(row);
    }
  }
}


/**
 * Creates a new map grid HTML element
 * @param map Map data
 */
export function HTMLWorldMapElement(map: WorldMap): HTMLDivElement {
  const containerElement = document.createElement('div');
  containerElement.id = 'map';
  containerElement.className = 'map-container';
  
  // Add the map rows
  for(var row = 0; row < map.rows; row++) {
    const rowElement = document.createElement('div');
    rowElement.id = `map-row-${row}`;
    rowElement.className = 'map-row';

    // Add the map cells
    for(var col = 0; col < map.columns; col++) {
      const terrain = map.terrain[row][col];
      const cellElement = document.createElement('div');
      cellElement.id = `map-cell-${row}-${col}`;
      cellElement.className = `map-cell ${terrain}`;
      cellElement.innerHTML = `${row}-${col}`;
      cellElement.onclick = () => console.log(terrain);
      rowElement.appendChild(cellElement);
    }

    containerElement.appendChild(rowElement);
  }

  return containerElement;
}