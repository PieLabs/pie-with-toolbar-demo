import React from 'react';
import ReactDOM from 'react-dom';
import FullScreen from 'material-ui/svg-icons/navigation/fullscreen';
import FullScreenExit from 'material-ui/svg-icons/navigation/fullscreen-exit';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';

export default class ExpandButton extends HTMLElement {

  constructor() {
    super();
    let sr = this.attachShadow({ mode: 'open' });
    sr.innerHTML = ``;
    this._expanded = false;
  }

  connectedCallback() {
    this._renderButton(this._expanded);

    this.shadowRoot.addEventListener('click', (event) => {
      let t = this._expanded ? 'collapse' : 'expand';
      this.shadowRoot.dispatchEvent(new CustomEvent(t, {
        bubbles: true, composed: true, detail: {
          done: (expanded) => {
            this._expanded = expanded;
            this._renderButton(this._expanded);
          }
        }
      }));
    });
  }

  _renderButton(expanded) {
    let re = React.createElement(_ExpandButton, { expanded: expanded });
    ReactDOM.render(re, this.shadowRoot);
  }
}

export class _ExpandButton extends React.Component {

  render() {
    const Button = this.props.expanded ? FullScreenExit : FullScreen;
    return <MuiThemeProvider>
      <IconButton>
        <Button />
      </IconButton>
    </MuiThemeProvider>;
  }
}