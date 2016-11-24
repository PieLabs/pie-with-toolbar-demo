export default class Passage extends HTMLElement {

  constructor() {
    super();
    let sr = this.attachShadow({ mode: 'open' });

    sr.innerHTML = `
    <style>
      :host{
        --passage-toolbar-border-color: rgba(0,0,0,0.2);
        display: flex;
        flex-direction: column;
      }

      :host .toolbar{
        border-bottom: solid 1px var(--passage-toolbar-border-color);
        display: block;
        text-align: right;
        padding: 0;
        margin: 0;
        flex-grow: 40px;
      }

      .main-holder{
        flex-grow: 1.0;
        padding: 20px;
        overflow-y: auto;
      }
    </style>
    <div class="toolbar">
      <text-to-speech-button></text-to-speech-button> 
      <expand-button></expand-button>
    </div>
    <div class="main-holder" text-to-speech>
      <slot id="main">Loading...</slot>
    </div>
    `;
  }

  connectedCallback() {
    let url = this.getAttribute('passage-url');
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = (e) => {
      if (xhr.status == 200) {
        let main = this.shadowRoot.querySelector('#main');
        main.innerHTML = xhr.responseText;
        this.shadowRoot.querySelector('text-to-speech-button').target = main;
      } else {
        console.error(xhr.status);
      }
    };
    xhr.send();
  }
}