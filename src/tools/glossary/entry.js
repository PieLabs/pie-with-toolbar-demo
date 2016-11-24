export default class GlossaryEntry extends HTMLElement{

  constructor(){
    super();
  }

  set definition(d){
    this._definition = d;
    console.log('definition: ', d);
  }

  connectedCallback(){
    this.dispatchEvent(new CustomEvent('glossary.entry', {bubbles: true, detail: {
      entry: this.textContent.trim(),
      definition: (d)=> {
        this.definition = d;
      }
    }}));

    this.addEventListener('click', (e) => {
      console.log('on click....');
      if(this._definition){
        e.preventDefault();
        e.stopImmediatePropagation();
        console.log('launch info...');
      }
    });
  }
}