import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton'
import Close from 'material-ui/svg-icons/navigation/close';

export default class Masking extends HTMLElement {

  constructor() {
    super();
    this._masks = [];
    // let sr = this.attachShadow({ mode: 'open' });

    document.addEventListener('masking', (event) => {
      this.enabled = event.detail.enabled;
    });

    document.addEventListener('DOMContentLoaded', () => {
      let id = this.getAttribute('target-id');
      this._targetNode = document.querySelector(`#${id}`);
      this.addListeners();
    });

  }

  addListeners() {
    console.log('addListeners...');
    let node = this._targetNode;
    let armed = false;

    node.addEventListener('mousedown', (event) => {
      if (!this._enabled) {
        return;
      }
      armed = true;
    });

    node.addEventListener('mouseup', (event) => {
      if (!this._enabled) {
        return;
      }
      console.log('[masking] mouseup')

      if (armed) {
        let m = { x: event.clientX, y: event.clientY, w: 50, h: 50 };
        console.log('_addMask', m)
        this._addMask(m);
      }

      armed = false;
    });
  }

  _addMask(m) {
    this._masks.push(m);
    let mask = document.createElement('tools-mask');
    mask.maskData = m;
    mask.relativeTo = this._targetNode;

    mask.addEventListener('remove', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.removeChild(event.target);
    });

    this.appendChild(mask);
  }

  set enabled(e) {
    console.log('enabled? ', e);
    this._enabled = e;
  }

  get enabled() {
    return this._enabled;
  }
}

