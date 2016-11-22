import tapEventPlugin from 'react-tap-event-plugin';
tapEventPlugin();

import LayoutHPane from '../../src/layout/h-pane';
customElements.define('layout-h-pane', LayoutHPane);

import Passage from '../../src/demo/passage/index';
customElements.define('demo-passage', Passage);

import ExpandButton from '../../src/demo/passage/expand-button';
customElements.define('expand-button', ExpandButton);

import Section from '../../src/demo/section';
customElements.define('demo-section', Section);

import CorespringChoice from 'corespring-choice';
customElements.define('corespring-choice', CorespringChoice);

import Notepad from '../../src/tools/notepad';
customElements.define('tools-notepad', Notepad);

import DemoMainToolbar from '../../src/demo/main-toolbar/index';
customElements.define('demo-main-toolbar', DemoMainToolbar);

import * as choiceController from 'corespring-choice/controller/src/index';

import _ from 'lodash'


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

  // document.querySelector('#expand').addEventListener('click', (event) => {
  //   event.target.dispatchEvent(new CustomEvent('expand', { bubbles: true }));
  // });

  // document.querySelector('#collapse').addEventListener('click', (event) => {
  //   event.target.dispatchEvent(new CustomEvent('collapse', { bubbles: true }));
  // });
});

