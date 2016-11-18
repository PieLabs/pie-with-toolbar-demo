import ToolbarContributionEvent from './events/toolbar-contribution';

export default class Section extends HTMLElement {

  constructor() {
    super();

    let shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <style>
      :host {}
      
      :host .label-holder{
        background-color: lightblue;
        width: 20px;
        padding: 10px;
      }

      </style> 
      <div class="label-holder">
        <label id="key-label"></label>
      </div>
      <sbac-toolbar id="toolbar">
        <slot name="tools"></slot>
      </sbac-toolbar>
      <slot></slot>
    `;

    this.addEventListener(ToolbarContributionEvent.eventType, (event) => {
      console.log('event: ', event);
      let toolbar = this.shadowRoot.querySelector('#toolbar');
      toolbar.addActions(event.detail.actions);
    });
  }

  connectedCallback() {
    let key = this.attributes.getNamedItem('key').value;
    let el = this.shadowRoot.querySelector('#key-label');
    console.log(el);
    el.textContent = key;
  }
}