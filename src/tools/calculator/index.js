//Lifted from: https://github.com/LingyuCoder/react-calculator

import _Calculator from './calculator';
import React from 'react';
import ReactDOM from 'react-dom';

require('./index.less');
require('./flex.less');

export default class Calculator extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    let re = React.createElement(_Calculator, {});
    ReactDOM.render(re, this);
  }
}
