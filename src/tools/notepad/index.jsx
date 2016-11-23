import ToolbarContributionEvent from '../../events/toolbar-contribution'
import React from 'react';
import ReactDOM from 'react-dom';
import ContentCreate from 'material-ui/svg-icons/content/create';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Editor, EditorState } from 'draft-js';
import { Icon } from './icon';


export default class Notepad extends HTMLElement {

  constructor() {
    super();
    this.sr = this.attachShadow({ mode: 'open' });
    this.sr.innerHTML = `
    
    <style>
      :host{
        position: absolute;
        left: 20px;
        top: 20px;
      }
    </style>
    <div id="root"></div>`;
    this._open = false;
  }

  set open(o) {
    this._open = o;

    if (!this.element) {
      return;
    }

    if (this._open) {
      console.log('show the notepad...', this.element);
      this.element.open();
    } else {
      console.log('hide the notepad...', this.element);
      this.element.close();
    }
  }

  get open() {
    return this._open;
  }

  connectedCallback() {
    let renderIcon = (holder, disabled) => {
      let re = React.createElement(Icon, { disabled: disabled });
      ReactDOM.render(re, holder);
    }

    this.dispatchEvent(new ToolbarContributionEvent({
      name: 'notepad',
      observable: (o) => {
        this._observable = o;
        this._observable.onUpdate((newValue) => {
          if (newValue !== this.open) {
            this.open = newValue;
          }
        });
      }
    }));

    this.open = false;

    let e = React.createElement(_Notepad, {
      onClose: () => {
        this._open = false;
        this._observable.update(false);
      }
    });

    this.element = ReactDOM.render(e, this.shadowRoot.querySelector('#root'));
  }
}

class _Notepad extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      editorState: EditorState.createEmpty()
    }
    this.focus = () => this.refs.editor.focus();
  }

  open() {
    this.setState({ open: true });
    this.focus();
  }

  close() {
    this.setState({ open: false }, () => {
      this.props.onClose();
    });
  }

  handleClose() {
    this.setState({ open: false });
  }

  onChange(editorState) {
    console.log('onChange: ', arguments);
    this.setState({ editorState });
  }

  render() {

    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.close.bind(this)}
        />,
    ];

    const {editorState} = this.state;

    return <MuiThemeProvider>
      <Dialog
        title="Notepad"
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.close.bind(this)}
        autoScrollBodyContent={true}
        contentStyle={{ padding: '0' }}
        bodyStyle={{ paddingTop: '0', paddingBottom: '0' }}
        >
        <div style={{
          borderLeft: 'solid 1px rgba(0,0,0, 0.12)',
          borderRight: 'solid 1px rgba(0,0,0, 0.12)',
          backgroundColor: 'rgba(0,0,0,0.1)', padding: '10px'
        }}>
          <Editor
            ref="editor"
            editorState={editorState}
            onChange={this.onChange.bind(this)} />
        </div>
      </Dialog>
    </MuiThemeProvider>
  }
}
