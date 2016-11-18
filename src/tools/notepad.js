import ToolbarButtonAction from '../demo/toolbar-button-action';

export default class Notepat extends HTMLElement {

  constructor() {
    super();
    this._action = {
      icon: 'notepad',
      handler: () => null
    }
  }
