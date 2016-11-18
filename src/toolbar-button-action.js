export default class ToolbarButtonAction extends HTMLElement {

  constructor() {
    super();

    this.addEventListener('click', e => {
      console.log('Click!');
      if (this._action.handler) {
        this._action.handler();
      }
    });

    let shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <style>
      :host {
        border-radius: 4px;
        border: solid 1px red;
        padding: 5px;
        display: inline-block;
      }
      </style> 
      <div class="label-holder">
      </div>
    `;

  }

  set action(a) {
    this._action = a;
  }

  connectedCallback() {
    console.log('this.action: ', this._action);
    this.shadowRoot.querySelector('.label-holder').innerHTML = this._action.icon;
  }
}