import AslToggleEvent from '../../events/asl-toggle';

export default class AslButton extends HTMLElement {

  constructor() {
    super();

    let sr = this.attachShadow({ mode: 'open' });

    sr.innerHTML = `

    <style>
      :host {
        display: inline-block;
        width: 20px 100px;
        position: relative;
      }

      label {
        cursor: pointer;
        position: absolute;
        width: 20px;
        height: 20px;
        top: 0;
        left: 0;
        background: #eee;
        border:1px solid #ddd;
      }
      
      label:after {
        opacity: 0.1;
        content: '';
        position: absolute;
        width: 9px;
        height: 5px;
        background: transparent;
        top: 4px;
        left: 5px;
        border: 3px solid #333;
        border-top: none;
        border-right: none;

        transform: rotate(-45deg);
      }
      
      label:hover::after {
        opacity: 0.5;
      }

      input[type=checkbox]:checked + label:after {
        opacity: 1;
      }
      
      input[type="checkbox"]{
        visibility: hidden;
      }
    </style>
  		<input type="checkbox" id="input" name="" />
	  	<label for="input"></label>
    `;
  }

  get _src() {
    return this.getAttribute('src');
  }

  connectedCallback() {
    this.shadowRoot.querySelector('[type="checkbox"]').addEventListener('click', (e) => {
      let checked = e.target.checked;
      this.dispatchEvent(new AslToggleEvent(this._src, checked));
    });
  }

}
