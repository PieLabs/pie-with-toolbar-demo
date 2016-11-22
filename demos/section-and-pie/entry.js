import Section from '../../src/demo/section';
customElements.define('demo-section', Section);

import CorespringChoice from 'corespring-choice';
customElements.define('corespring-choice', CorespringChoice);

import Notepad from '../../src/tools/notepad';
customElements.define('tools-notepad', Notepad);

import * as choiceController from 'corespring-choice/controller/src/index';

import _ from 'lodash';

import tapEventPlugin from 'react-tap-event-plugin';
tapEventPlugin();

console.log('choiceController: ', choiceController);

let config = require('./config.json');

console.log('config: ', config);

document.addEventListener('pie.register', (event) => {
  console.log('> pie.register: ', event);

  let id = event.target.getAttribute('pie-id');
  let rawModel = _.find(config.pies, (p) => p.id === id);
  console.log('rawModel: ', rawModel);
  choiceController.model(rawModel, {}, { mode: 'gather' })
    .then((uiModel) => {
      event.target.model = uiModel;
      event.target.session = {};
    });
});


document.addEventListener('DOMContentLoaded', () => {
  console.log('dom content loaded');
});

