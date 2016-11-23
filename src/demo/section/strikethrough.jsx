import forEach from 'lodash/forEach';
import React from 'react';
import ReactDOM from 'react-dom';
import StrikethroughIcon from 'material-ui/svg-icons/editor/format-strikethrough';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import {Observable} from './observable';

export const NAME = 'strikethrough';

export class Strikethrough{

  constructor(toolbar){
    this.name = NAME;
    this.toolbar = toolbar;
    this._handlers = [];
    this._enabled = new Observable(false);
    this._span = this._render();
    
    let renderIcon = (enabled) => {
      let re = React.createElement(_Icon, {
        disabled: !enabled 
      });
      ReactDOM.render(re, this._span);
    } 

    this._enabled.onUpdate(enabled => {
      renderIcon(enabled);
    });

    this._enabled.update(false, true);
  }

  _render(){
    let span = document.createElement('span');
    span.setAttribute('data-capability', NAME);
    this.toolbar.appendChild(span);
    span.addEventListener('click', (event) => {
      this._enabled.update(!this._enabled.value);
    });
    return span;
  }

  add(handler){
    handler.observable(this._enabled);
  }
}

Strikethrough.NAME = NAME;


class _Icon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: this.props.disabled || true
    }
  }

  componentWillReceiveProps(next) {
    this.setState({ disabled: next.disabled });
  }

  render() {
    return <MuiThemeProvider>
      <IconButton
        disabled={this.state.disabled}>
        <StrikethroughIcon />
      </IconButton>
    </MuiThemeProvider >
  }
}
