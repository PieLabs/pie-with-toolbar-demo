import ToolbarContributionEvent from '../../events/toolbar-contribution'
import React from 'react';
import ReactDOM from 'react-dom';
import ContentCreate from 'material-ui/svg-icons/content/create';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import tapEventPlugin from 'react-tap-event-plugin';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Editor, EditorState } from 'draft-js';


tapEventPlugin();

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

    this.dispatchEvent(new ToolbarContributionEvent({
      icon: (holder) => {
        this.icon = document.createElement('tools-notepad-icon');
        this.icon.addEventListener('click', () => {
          this.open = true;
          this.icon.open = true;
        });
        holder.appendChild(this.icon);
      },
      handler: () => {
        console.log('handle notepad click...')
      }
    }));

    this.open = false;

    let e = React.createElement(_Notepad, {
      onClose: () => {
        console.log('[onClose] ... ');
        this._open = false;
        this.icon.open = false;
      }
    });

    let rendered = ReactDOM.render(e, this.shadowRoot.querySelector('#root'), () => {
    });

    this.element = rendered;
  }
}

class _Notepad extends React.Component {

  constructor() {
    super();
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
    console.log('[close], ', this);
    this.setState({ open: false }, () => {
      console.log('[state callback]....');
      this.props.onClose();
    });
  }

  handleClose() {
    console.log('this.props: ', this.props);
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
