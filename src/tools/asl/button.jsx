import React from 'react';
import ReactDOM from 'react-dom';
import AslToggleEvent from '../../events/asl-toggle';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import HTMLElementWithEvents from './html-element-with-events';

export default class AslButton extends HTMLElementWithEvents {

  constructor() {
    super();
    this._src = this.attributes['src'].nodeValue;
    this._render();
  }

  toggle() {
    document.dispatchEvent(new AslToggleEvent(this._src));
  }

  _render() {
    let re = React.createElement(_Button, {toggle: this.toggle, wrapper: this});
    ReactDOM.render(re, this);
    this.retargetEvents();
  }

}

class _Button extends React.Component {

  constructor(props) {
    super(props);
    this.toggle = props.toggle;
    this.wrapper = props.wrapper;
  }

  render() {
    return <MuiThemeProvider>
      <RaisedButton onClick={this.toggle.bind(this.wrapper)}>ASL</RaisedButton>
    </MuiThemeProvider>;
  }

}