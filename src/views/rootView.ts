import { WorldMapView } from "./worldMapView";
import { BaseView, UI } from "./ui";
import { NavBarView } from "./navBarView";

export class RootView extends BaseView {

  static rootId = 'root';

  navBarView: NavBarView;
  contentView: BaseView;

  // Inherited members
  parentView: BaseView;
  rootElement: HTMLElement

  constructor() {
    super(RootView.rootId);
    this.contentView = new RootContentView(this);
    this.navBarView = new NavBarView(this.contentView, this);
  }
}

export class RootContentView extends BaseView {

  static rootId = 'root-content';

  // Inherited members
  parentView: BaseView;
  rootElement: HTMLElement

  constructor(parentView: BaseView) {
    super(RootContentView.rootId, parentView);
  }
}