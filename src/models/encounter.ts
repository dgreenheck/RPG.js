/*
Situation
- Prompt
- Action
    - Prompt
    - Action
        - Prompt
        - Outcome
- Action
    - Prompt
    - Outcome

More generally, you get text and buttons. Each button can display more actions and buttons.

Actions, Prompts and Outcomes can be combined into one object

Situation
- prompt: string
- actions: [string: Situation]
- effect: (Player, World) => void

* Prompt is displayed text
* Action are the different actions the player can take in response
* Effect is the option result of a situation occurring. For instance, the player could take damage, gain an inventory item or enter combat
*/

export default class Encounter {
  title: string;
  
  constructor() {
    this.title = 'My Encounter';
  }
}

class EncounterEvent {
  prompt: string;
  options: [EncounterEvent];
  effect: EncounterEffect;
}

// Abstract class
class EncounterEffect {
  apply(): void {
    // No -op
  }
}
