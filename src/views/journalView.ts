import { journal } from '../models/journal';
import { BaseView, UI } from './ui';

export class JournalView extends BaseView {

  static rootId = 'journal';

  // Inherited members
  parentView: BaseView;
  rootElement: HTMLElement;

  /**
   * Creates a nav bar view
   * @param parentView The parent view that will contain the root element of this view.
   */
  constructor(parentView: BaseView) {
    super(JournalView.rootId, parentView);
    this.setup();
  }

  setup(): void {
    return;
  }
}