import Character from './character';
import Dice from '../util/dice';

export class Combat {
  playerParty: Character[];
  enemyParty: Character[];

  dice = new Dice();

  constructor(playerParty: Character[], enemyParty: Character[]) {
    this.playerParty = playerParty;
    this.enemyParty = enemyParty;
  }

  start() {
    const allPlayers = this.playerParty.concat(this.enemyParty);
    const sortedPlayers = this.findCombatOrder(allPlayers);
    console.log(sortedPlayers);
  }

  findCombatOrder(unsortedPlayers: Character[]): Character[] {
    const sorted: Character[] = [];

    // Roll initiative for each character
    const map = new Map<number, Character>();
    for(const player of unsortedPlayers) {
      const initiative = this.dice.roll20() + player.modifiers.dexterity;
      map.set(initiative, player);
    }

    // Sort the initiative rolls from highest to lowest
    let keys = Object.keys(map.keys).map(s => Number(s));
    keys = keys.sort().reverse();

    // Add the characters to the sorted array in order of the keys
    for(const key of keys) {
      sorted.push(map.get(key));
    }

    return sorted;
  }
}