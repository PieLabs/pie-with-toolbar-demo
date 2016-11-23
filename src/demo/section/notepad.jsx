import React from 'react';
import ReactDOM from 'react-dom';
import { Observable } from './observable';
import { Icon } from '../../tools/notepad/icon';

export const NAME = 'notepad';

export class Notepad {
  constructor(toolbar) {
    this.name = NAME;
    this.toolbar = toolbar;
    this._enabled = new Observable(false);
    this._holder = this._render();

    this._enabled.onUpdate((enabled) => {
      let re = React.createElement(Icon, { disabled: enabled });
      ReactDOM.render(re, this._holder);
    });

    this._enabled.update(false, true);
  }

  _render() {
    let span = document.createElement('span');
    span.setAttribute('data-capability', NAME);
    this.toolbar.appendChild(span);
    span.addEventListener('click', (event) => {
      this._enabled.update(!this._enabled.value);
    });
    return span;
  }

  add(h) {
    h.observable(this._enabled);
  }
}

Notepad.NAME = NAME;

