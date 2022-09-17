import Random from './random';

export default class Dice {
  rng: Random;

  constructor() {
    this.rng = new Random(Date.now());
  }

  roll4(): number {
    return this.rng.nextInt(1, 5);
  }

  roll8(): number {
    return this.rng.nextInt(1, 9);
  }

  roll10(): number {
    return this.rng.nextInt(1, 11);
  }

  roll12(): number {
    return this.rng.nextInt(1, 13);
  }

  roll20(): number {
    return this.rng.nextInt(1, 21);
  }
}