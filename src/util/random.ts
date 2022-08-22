export default class Random {
  seed: number

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    var t = this.seed += 0x6D2B79F5;
    console.log(this.seed);
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }

  nextInt(min: number, max: number): number {
    return Math.floor(min + (max - min) * this.next());
  }
}