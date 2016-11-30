import interact from 'interact.js';

export default class FloatingPanel extends HTMLElement {
  constructor() {
    super();

    let sr = this.attachShadow({ mode: 'open' });

    sr.innerHTML = `
    <style>
    @font-face {
      font-family: 'Material Icons';
      font-style: normal;
      font-weight: 400;
      src: local('Material Icons'), local('MaterialIcons-Regular'), url(http://fonts.gstatic.com/s/materialicons/v18/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2) format('woff2');
    }

    .material-icons {
      font-family: 'Material Icons';
      font-weight: normal;
      font-style: normal;
      font-size: 24px;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
      -webkit-font-feature-settings: 'liga';
      -webkit-font-smoothing: antialiased;
    }
    
    .close-icon{
      float: right;
      cursor: pointer;
      transition: color ease 200ms;
    }
    
    .close-icon > svg:hover{
      fill: rgba(0,0,0,0.4);;
    }

    :host{
      font-family: 'Roboto', sans-serif;
      display: block;
      border: solid 1px rgba(0,0,0,0.2);;
      box-shadow: 2px 4px 17px 4px rgba(0,0,0,0.42);
      border-radius: 3px;
      background-color: white;      
    }

    .header{
      padding: 10px;
      transition: background-color ease-in 100ms;
      border-bottom: solid 1px rgba(0,0,0, 0.15);
    }

    .header:hover{
      background-color: rgba(0,0,0,0.1);
      cursor: pointer;
    }

    </style>
    <div class="root">
      <div class="header">
        <label id="title"></label>
        <span class="close-icon">
          <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        </span>
      </div>
      <slot></slot> 
    </div>
    `;
  }

  connectedCallback() {
    let t = this.getAttribute('title');
    this.shadowRoot.querySelector('#title').textContent = t;
    this.setAttribute('style', 'z-index: 1000; position: absolute;');

    let onDrag = (event) => {
      var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      // translate the element
      target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

      // update the posiion attributes
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    }

    let header = this.shadowRoot.querySelector('.header');

    this._d = interact(this)
      .draggable({
        onmove: onDrag
      })
      .allowFrom(header);


    let closeIcon = this.shadowRoot.querySelector('.close-icon');

    closeIcon.addEventListener('click', (event) => {
      //TODO - should dispatch an event and let the close happen elsewhere.
      let holder = document.querySelector('#calculator-holder');
      holder.parentNode.removeChild(holder);
    });

  }
}