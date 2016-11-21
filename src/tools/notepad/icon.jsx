import React from 'react';
import ReactDOM from 'react-dom';
import ContentCreate from 'material-ui/svg-icons/content/create';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import tapEventPlugin from 'react-tap-event-plugin';


export default class Icon extends HTMLElement {

  constructor() {
    super();
    this._open = false;
    let sr = this.attachShadow({ mode: 'open' });
  }

  set open(o) {
    console.log('icon open?', o);
    this._open = o;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    let element = React.createElement(_Icon, { disabled: this._open });
    ReactDOM.render(element, this.shadowRoot, () => {
      console.log('rendered');
    });
  }
}

class _Icon extends React.Component {
  render() {
    return <MuiThemeProvider>
      <IconButton tooltip="Launch notepad" disabled={this.props.disabled}>
        <ContentCreate />
      </IconButton>
    </MuiThemeProvider>
  }
}