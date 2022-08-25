import Encounter from "../models/encounter";
import { BaseView, UI } from "./ui";

export class EncounterView extends BaseView {

  static rootId = 'encounter';

  encounter: Encounter;

  // Inherited members
  parentView: BaseView;
  rootElement: HTMLElement

  /**
   * Creates a nav bar view
   * @param parentView The parent view that will contain the root element of this view.
   */
  constructor(encounter: Encounter, parentView: BaseView) {
    super(EncounterView.rootId, parentView);
    this.encounter = encounter;
    this.setup();
  }

  setup() {
    this.rootElement.appendChild(UI.button(this.encounter.title, () => {}));
  }
}