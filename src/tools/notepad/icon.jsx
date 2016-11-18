import React from 'react';
import ReactDOM from 'react-dom';
import ContentCreate from 'material-ui/svg-icons/content/create';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import tapEventPlugin from 'react-tap-event-plugin'

tapEventPlugin();

export default class Icon extends HTMLElement {

  constructor() {
    super();
    let sr = this.attachShadow({ mode: 'open' });
    sr.innerHTML = `
    `;
    let element = React.createElement(_Icon, {});
    ReactDOM.render(element, sr, function () {
      console.log('rendered');
    });
  }
}

class _Icon extends React.Component {
  render() {
    return <MuiThemeProvider>
      <IconButton tooltip="Launch notepad">
        <ContentCreate />
      </IconButton>
    </MuiThemeProvider>
  }
}