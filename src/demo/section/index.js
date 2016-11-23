import ToolbarContributionEvent from '../../events/toolbar-contribution';
import includes from 'lodash/includes';
import forEach from 'lodash/forEach';

import { Strikethrough } from './strikethrough';
import { Notepad } from './notepad';

export default class Section extends HTMLElement {

  constructor() {
    super();

    this._capabilities = [Strikethrough, Notepad];
    this._activeCapabilities = {};

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

  _addIcon(capability) {
    let span = document.createElement('span');
    span.setAttribute('data-capability', capability);
    toolbar.appendChild(span);

    span.addEventListener('click', (event) => {
      console.log('click: ', event.target);
    });

  }

  connectedCallback() {
    this.addEventListener(ToolbarContributionEvent.eventType, (event) => {

      event.preventDefault();
      event.stopImmediatePropagation();

      let toolbar = this.shadowRoot.querySelector('#toolbar');
      forEach(event.detail.capabilities, c => {

        if (!this._activeCapabilities[c.name]) {
          let Capability = _.find(this._capabilities, a => a.NAME === c.name);
          if (!Capability) {
            throw new Error('unsupported capability: ' + c.name);
          }
          let instance = new Capability(toolbar);
          this._activeCapabilities[c.name] = instance;
        }

        this._activeCapabilities[c.name].add(c);
      });
    });

    let key = this.attributes.getNamedItem('key').value;
    let el = this.shadowRoot.querySelector('#key-label');
    el.textContent = key;
  }
}