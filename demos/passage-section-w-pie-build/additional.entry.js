import tapEventPlugin from 'react-tap-event-plugin';

try {
  tapEventPlugin();
  console.log('tapEventPlugin succeeded.');
} catch (e){
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

// import _ from 'lodash'

document.addEventListener('DOMContentLoaded', () => {
  console.log('dom content loaded');
});

