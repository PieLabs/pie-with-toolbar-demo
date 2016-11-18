import _ from 'lodash';
import ToolbarButtonAction from './toolbar-button-action';

export default class Toolbar extends HTMLElement {

  constructor() {
    super();
    let shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <style>
      :host {

      }

      :host :slot{
        display: inline;
      }
      
      :host .holder {
        border: solid 1px red;
      }
      
      </style>
      <div class="holder">
        <slot></slot>
      </div>
    `;
  }

  addActions(actions) {
    console.log('add actions: ', actions);

    let holder = this.shadowRoot.querySelector('.holder');


    _.forEach(actions, a => {
      let button = document.createElement('toolbar-button-action');
      button.action = a;
      // button.setAttribute('is', 'toolbar-button-action');
      holder.appendChild(button);
    });
  }

}