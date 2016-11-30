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
    console.log('!!addListeners...');
    let node = this._targetNode;
    let armed = false;

    node.addEventListener('mousedown', (event) => {
      if (!this._enabled) {
        return;
      }

      if (this._maskBeingCreated) {
        throw new Error('A mask is already being created');
      }

      let m = { x: event.clientX, y: event.clientY, w: 0, h: 0 }
      this._maskBeingCreated = this._addMask(m);
      this._downEvent = event;
    });

    node.addEventListener('mousemove', (event) => {

      console.log('mouse move');
      if (!this._enabled) {
        return;
      }

      if (this._maskBeingCreated && this._downEvent) {
        let w = Math.max(0, this._downEvent.clientX - event.clientX);
        let h = Math.max(0, this._downEvent.clientY - event.clientY);
        this._maskBeingCreated.resize({ w: w, h: h });
      }
    });

    node.addEventListener('mouseup', (event) => {
      if (!this._enabled) {
        return;
      }
      this._maskBeingCreated = null;
      this._downEvent = null;
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
    return mask;
  }

  set enabled(e) {
    console.log('enabled? ', e);
    this._enabled = e;
  }

  get enabled() {
    return this._enabled;
  }
}

