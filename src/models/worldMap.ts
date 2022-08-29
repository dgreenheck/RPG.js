import Alea from '../util/alea';
import { createNoise2D, NoiseFunction2D } from '../../node_modules/simplex-noise/dist/esm/simplex-noise';
import Random from '../util/random';
import Settlement from './settlement';

export enum TileType {
  Plains = 'plains',
  Mountain = 'mountain',
  Water = 'water'
}

/**
 * Object representing the world map data
 */
export class WorldMap {
  seed: number;
  size: number;
  scale: number;

  /**
   * Map data
   */
  terrain: TileType[][];
  settlements = new Map<number, Settlement>();

  /**
   * Random number generator
   */
  rng: Random;
  rng2D: NoiseFunction2D;
    
  /**
   * Initializes a new instance of the world map
   * @param size Size of the map
   * @param scale Scale used for the terrain generation function
   * @param seed The seed value used for the RNG
   */
  constructor(
    size: number, 
    scale = 0.2, 
    seed = 0
  ) {
    this.size = size;
    this.scale = scale;
    this.seed = seed;
    this.generate();
  }

  clear() {
    this.terrain = [];
    this.settlements.clear();
  }

  generate() {
    console.log(`Generating new map (size: ${this.size}, seed: ${this.seed})`);

    this.clear();

    // Reset the RNG
    this.rng = new Random(this.seed);
    this.rng2D = createNoise2D(Alea(this.seed));

    this.generateTerrain();
    this.generateSettlements();
  }


  generateTerrain() {
    console.log('Generating terrain...');
    this.terrain = [];
    for (let y = 0; y < this.size; y++) {
      const row: TileType[] = [];

      for (let x = 0; x < this.size; x++) {
        const value = 0.5 * (this.rng2D(this.scale * x, this.scale * y) + 1);
        if (value > 0.80) {
          row.push(TileType.Mountain);
        } else if (value > 0.35) {
          row.push(TileType.Plains);
        } else {
          row.push(TileType.Water);
        }
      }
      this.terrain.push(row);
    }
    console.log('Done');
  }

  generateSettlements() {
    console.log('Generating settlements...');
    const target = 20;
    let count = 0;
    while (count < target) {
      const x = this.rng.nextInt(0, this.size);
      const y = this.rng.nextInt(0, this.size);
      const k = (y * this.size) + x;
      if (this.terrain[y][x] === TileType.Plains && !this.settlements.has(k)) {
        this.settlements.set(k, new Settlement());
        count++;
      }
    }

    console.log('Done');
  }
}