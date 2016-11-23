import forEach from 'lodash/forEach';

export class Observable{
  constructor(value){
    this._value = value;
    this._handlers = [];
  }

  get value(){
    return this._value;
  }

  onUpdate(handler){
    this._handlers.push(handler);
  }

  update(v, force = false){
    if(this._value !== v || force === true){
      this._value = v;
      forEach(this._handlers, fn => fn(this._value));
    }
  }
}