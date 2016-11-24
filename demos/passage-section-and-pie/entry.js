import tapEventPlugin from 'react-tap-event-plugin';
tapEventPlugin();

import LayoutHPane from '../../src/layout/h-pane';
customElements.define('layout-h-pane', LayoutHPane);

import Passage from '../../src/demo/passage/index';
customElements.define('demo-passage', Passage);

import ExpandButton from '../../src/demo/passage/expand-button';
customElements.define('expand-button', ExpandButton);

import Section from '../../src/demo/section/index';
customElements.define('demo-section', Section);

import CorespringChoice from 'corespring-choice';
customElements.define('corespring-choice', CorespringChoice);

import Notepad from '../../src/tools/notepad';
customElements.define('tools-notepad', Notepad);

import DemoMainToolbar from '../../src/demo/main-toolbar/index';
customElements.define('demo-main-toolbar', DemoMainToolbar);

import TextToSpeechButton from '../../src/tools/text-to-speech/button';
customElements.define('text-to-speech-button', TextToSpeechButton);

import Masking from '../../src/tools/masking/index';
customElements.define('tools-masking', Masking);

import Mask from '../../src/tools/masking/mask';
customElements.define('tools-mask', Mask);

import * as choiceController from 'corespring-choice/controller/src/index';

import _ from 'lodash'

let config = require('./config.json');

document.addEventListener('pie.register', (event) => {
  let id = event.target.getAttribute('pie-id');
  let rawModel = _.find(config.pies, (p) => p.id === id);
  choiceController.model(rawModel, {}, { mode: 'gather' })
    .then((uiModel) => {
      event.target.model = uiModel;
      event.target.session = {};
    });
});

document.addEventListener('DOMContentLoaded', () => {
  console.log('dom content loaded');
});

let envControl;

window.pie = window.pie || {};
window.pie.env = { mode: 'gather' }

document.addEventListener('pie.env-requested', (event) => {
  envControl = event.target;
  envControl.env = window.pie.env;
  envControl.addEventListener('envChanged', (event) => {
    handleEnvChanged(event.detail.env);
  });
});

