import tapEventPlugin from 'react-tap-event-plugin';

try {
  tapEventPlugin();
  console.log('tapEventPlugin succeeded.');
} catch (e) {
  console.log('tapEventPlugin failed.');
}

import LayoutHPane from '../../src/layout/h-pane';
customElements.define('layout-h-pane', LayoutHPane);

import Passage from '../../src/demo/passage/index';
customElements.define('demo-passage', Passage);

import TextToSpeechButton from '../../src/tools/text-to-speech/button';
customElements.define('text-to-speech-button', TextToSpeechButton);

import ExpandButton from '../../src/demo/passage/expand-button';
customElements.define('expand-button', ExpandButton);

import Section from '../../src/demo/section';
customElements.define('demo-section', Section);


import Notepad from '../../src/tools/notepad';
customElements.define('tools-notepad', Notepad);

import DemoMainToolbar from '../../src/demo/main-toolbar/index';
customElements.define('demo-main-toolbar', DemoMainToolbar);

import Masking from '../../src/tools/masking/index';
customElements.define('tools-masking', Masking);

import Mask from '../../src/tools/masking/mask';
customElements.define('tools-mask', Mask);

const controllerModule = require('./controllers');

window.pie = window.pie || {};
window.pie.env = { mode: 'gather' };
window.pie.model = require('./config.json'); 

window.pie.session = [];

let envControl, player;

let handleEnvChanged = (e) => {
  if (player) {
    player.env = e;
  }
}

document.addEventListener('pie.env-requested', (event) => {
  envControl = event.target;
  envControl.env = window.pie.env;
  envControl.addEventListener('envChanged', (event) => {
    handleEnvChanged(event.detail.env);
  });
});

document.addEventListener('pie.player-ready', function (event) {
  player = event.target;

  var pieController = new pie.Controller(window.pie.model, controllerModule);

  player.controller = pieController;
  player.env = window.pie.env;
  player.session = window.pie.session;

  pieController.getLanguages().then(function (l) {
    if (envControl) {
      envControl.languages = l;
    }
  });

});
