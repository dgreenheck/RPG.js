import { Alea } from "../../node_modules/alea/alea";
import { createNoise2D } from "../../node_modules/simplex-noise/dist/esm/simplex-noise"

/**
 * Enumeration of different world map sizes
 */
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
    const prng = Alea('seed');
    const noise = createNoise2D(prng);
    
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
}