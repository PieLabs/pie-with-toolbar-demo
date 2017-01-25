import AslToggleEvent from '../../events/asl-toggle';

export default class ASLContent extends HTMLElement {

  constructor() {
    super();
    let sr = this.attachShadow({ mode: 'open' });
    this.setAttribute('hidden', '');
    sr.innerHTML = `
      <div>
      <video controls>
         <source type="video/webm" />
       </video>
      </div>
    `;
  }

  show(src, show) {
    if (show) {
      this.removeAttribute('hidden');
    } else {
      this.setAttribute('hidden', '');
    }
    this.shadowRoot.querySelector('video').setAttribute('src', src);
  }
}
