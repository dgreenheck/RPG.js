
export default class Character {
  hp: number;
  initiative: number;

  abilities: {
    strength: number;
    dexterity: number;
    endurance: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };

  modifiers = {
    get strength() { return this.#calculateModifier(this.strength) / 10; },
    get dexterity() { return this.#calculateModifier(this.dexterity) / 10; },
    get endurance() { return this.#calculateModifier(this.endurance) / 10; },
    get intelligence() { return this.#calculateModifier(this.intelligence) / 10; },
    get wisdom() { return this.#calculateModifier(this.wisdom) / 10; },
    get charisma() { return this.#calculateModifier(this.charisma) / 10; }
  };

  #calculateModifier(ability: number) {
    return Math.floor((ability - 10) / 2);
  }
}