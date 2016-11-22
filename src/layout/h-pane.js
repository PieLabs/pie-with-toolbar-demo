export default class LayoutHPane extends HTMLElement {


  constructor() {
    super();

    let sr = this.attachShadow({ mode: 'open' });

    sr.innerHTML = `

    <style>

      :host{

        --h-pane-bg-color: white;
        
        display: flex;
        background-color: var(--h-pane-bg-color, red);
        flex-flow: row;
        width: 100%;
      }

      :host .left-pane{
        flex: 1;
        border-right: solid 1px rgba(0,0,0,0.1);
      }

      :host .right-pane{
        background-color: var(--h-pane-bg-color, red);
        flex: 1;
        transition: all 400ms;
      }

      :host .right-pane.collapsed{
        flex-grow: 0.2;
        width: 200px;
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
        }, 300);
      }
    }

    this.addEventListener('expand', handleChange(() => {
      let e = this.shadowRoot.querySelector('.right-pane');
      e.className += ' collapsed';
    }));

    this.addEventListener('collapse', handleChange(() => {
      let e = this.shadowRoot.querySelector('.right-pane');
      e.className = 'right-pane';
    }));
  }

  get expanded() {
    return this.shadowRoot.querySelector('.right-pane').className === 'right-pane collapsed';
  }

}