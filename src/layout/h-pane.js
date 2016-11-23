export default class LayoutHPane extends HTMLElement {


  constructor() {
    super();

    let sr = this.attachShadow({ mode: 'open' });

    sr.innerHTML = `

    <style>

      :host{
        --h-pane-bg-color: white;
        position:relative; 
        background-color: var(--h-pane-bg-color, red);
      }

      :host .left-pane{
        position: absolute;
        background-color: var(--h-pane-bg-color, red);
        left: 0;
        bottom: 0;
        top: 0;
        width: 50%;
        border-right: solid 1px rgba(0,0,0,0.1);
        z-index: 1;
        transition: width 100ms;
      }

      .left-pane.expanded{
        width: 80%;
        -webkit-box-shadow: 4px 0px 10px -2px rgba(0,0,0,0.1);
        -moz-box-shadow: 4px 0px 10px -2px rgba(0,0,0,0.1);
        box-shadow: 4px 0px 10px -2px rgba(0,0,0,0.1);
      }

      :host .right-pane{
        z-index: 0;
        position: absolute;
        right: 0;
        bottom: 0;
        top: 0;
        width: 50%;
        background-color: var(--h-pane-bg-color, red);
        transition: all 400ms;
        overflow-y: auto;
      }
      
    </style> 
      <div class="left-pane">
        <slot name="left">Left pane</slot>
      </div>
      <div class="right-pane">
        <slot name="right">Right pane</slot>
      </div>
    `;


    //TODO: any way to handle transition events?
    let handleChange = (fn) => {
      return (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();

        if (this._animating) {
          console.log('animating - skip');
          return;
        }

        this._animating = true;
        fn();

        setTimeout(() => {
          this._animating = false;
          event.detail.done(this.expanded);
        }, 120);
      }
    }

    this.addEventListener('expand', handleChange(() => {
      let e = this.shadowRoot.querySelector('.left-pane');
      e.className += ' expanded';
    }));

    this.addEventListener('collapse', handleChange(() => {
      let e = this.shadowRoot.querySelector('.left-pane');
      e.className = 'left-pane';
    }));
  }

  get expanded() {
    return this.shadowRoot.querySelector('.left-pane').className === 'left-pane expanded';
  }

}