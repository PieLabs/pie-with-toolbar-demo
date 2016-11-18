import ToolbarButtonAction from './toolbar-button-action';

export default class MarkForReview extends ToolbarButtonAction {

  constructor() {
    super();
    this._action = {
      icon: 'mark-for-review!',
      handler: () => null
    }
  }
}