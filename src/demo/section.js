import ToolbarContributionEvent from '../events/toolbar-contribution';

export default class Section extends HTMLElement {

  constructor() {
    super();

    let shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <style>


      :host {
        --section-border-color: rgba(40,100,140, 0.2);
        --section-label-bg: rgba(80,200,232, 0.3);
        display: block;
        padding: 10px;
        margin: 10px;
        font-family: 'Roboto', san-serif;
      }

      :host .label-holder{
        background-color: var(--section-label-bg, red); 
        height: 100%;
        width: 50px;
        padding-top: 15px;
        text-align: center;
        box-sizing: border-box;
        margin: 0px;
        display: inline-block;
      }

      :host #toolbar{
        float: right;
      }

      [name="toolbar"]::slotted(*){
        padding: 0;
        margin: 0;
        border-left: solid 1px var(--section-border-color, red); 
      } 

      :host .header{
        padding: 0;
        height: 100%;
        height: 50px;
        border-bottom: solid 1px var(--section-border-color, red); 
        border-top: solid 1px var(--section-border-color, red); 
      }

      :host .tools{
        background-color: red;
      }
      </style> 
      <div class="header">
        <span class="label-holder">
          <label id="key-label"></label>
        </span>
        <span id="toolbar"></span>
        <slot class="tools" name="tools"></slot>
      </div>
      <slot></slot>
    `;

  }

  connectedCallback() {
    this.addEventListener(ToolbarContributionEvent.eventType, (event) => {
      let toolbar = this.shadowRoot.querySelector('#toolbar');
      _.forEach(event.detail.actions, a => {
        a.icon(toolbar);
      });
    });

    let key = this.attributes.getNamedItem('key').value;
    let el = this.shadowRoot.querySelector('#key-label');
    console.log(el);
    el.textContent = key;
  }
}