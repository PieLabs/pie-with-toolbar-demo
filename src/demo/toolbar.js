import _ from 'lodash';
import ToolbarButtonAction from './toolbar-button-action';

export default class Toolbar extends HTMLElement {

  constructor() {
    super();

    let shadowRoot = this.attachShadowRoot({ mode: 'open' });

    shadowRoot.innerHTML = `
    <style>
      :host{
        display: block;
      }
    </style>
    <div class="holder"></div> 
    `;
  }

  addActions(actions) {
    let holder = this.shadowRoot.querySelector('.holder');
    _.forEach(actions, a => {
      holder.appendChild(a.icon);
      a.onIconAdded(a.icon, holder);
    });
  }

}