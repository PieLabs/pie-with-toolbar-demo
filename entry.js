console.log('hi');

import ToolbarButtonAction from './src/toolbar-button-action';
customElements.define('toolbar-button-action', ToolbarButtonAction, { extends: 'button' });

import MultipleChoice from './src/multiple-choice';
customElements.define('multiple-choice', MultipleChoice);

import MarkForReview from './src/mark-for-review';
customElements.define('mark-for-review', MarkForReview);

import SbacToolbar from './src/sbac-toolbar';
customElements.define('sbac-toolbar', SbacToolbar);

import SbacSection from './src/sbac-section';
customElements.define('sbac-section', SbacSection);