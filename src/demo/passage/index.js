import AslToggle from '../../events/asl-toggle';

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

      asl-button, .asl-text{
        position: relative;
        top: -6px;
      }
    </style>
    <div class="toolbar">
      <span class="asl-text">ASL</span>
      <asl-button src="passage-asl.webm"></asl-button>
      <text-to-speech-button></text-to-speech-button> 
      <expand-button></expand-button>
    </div>
    <div class="main-holder" text-to-speech>
      <asl-content src="passage-asl.webm"></asl-content>
      <slot id="main">Loading...</slot>
    </div>
    `;
  }

  set model(m) {
    this._passageUrl = m.passageUrl;
    this._loadPassage();
  }

  _loadPassage() {
    if (this._passageUrl) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', this._passageUrl, true);
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

  connectedCallback() {
    this.shadowRoot.querySelector('asl-button').addEventListener(AslToggle.TYPE, (e) => {
      this.shadowRoot.querySelector('asl-content').show(e.detail.src, e.detail.show);
    });
  }
}