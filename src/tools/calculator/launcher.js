export default class Launcher extends HTMLElement {

  constructor() {
    super();
    this._holderId = `__calculator_holder`;
  }

  connectedCallback() {
    document.addEventListener('launch-calculator', () => {
      let existing = document.querySelector(`#${this._holderId}`);

      if (existing) {
        return;
      }

      let holder = document.createElement('div');

      holder.innerHTML = `
        <layout-floating-panel title="Calculator">
          <div style="width: 400px; height: 600px;">
            <tools-calculator></tools-calculator>
          </div>
        </layout-floating-panel>
      `;

      holder.setAttribute('id', this._holderId);
      document.body.appendChild(holder);

      let div = document.querySelector(`#${this._holderId}`);
      let panel = div.querySelector('layout-floating-panel');
      panel.addEventListener('close-panel', (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        div.parentNode.removeChild(div);
      })
    });
  }
}