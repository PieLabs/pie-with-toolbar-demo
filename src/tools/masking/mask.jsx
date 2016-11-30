import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton'
import Close from 'material-ui/svg-icons/navigation/close';
import interact from 'interact.js';

export default class Mask extends HTMLElement {
  constructor() {
    super();
  }

  set maskData(d) {
    this._maskData = d;
    this._render();
  }

  set relativeTo(node) {
    this._relativeTo = node;
    this._render();
  }

  resize(d) {
    this._maskData.w = d.w;
    this._maskData.h = d.h;
    this._render();
  }

  _render() {

    if (this._maskData && this._relativeTo) {

      let re = React.createElement(_Mask, {
        w: this._maskData.w,
        h: this._maskData.h,
        x: this._maskData.x,
        y: this._maskData.y,
        remove: () => {
          this.dispatchEvent(new CustomEvent('remove', { bubbles: true, composed: true }));
        }
      });

      ReactDOM.render(re, this);
    }
  }
}

class _Mask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      w: props.w || 50,
      h: props.h || 50,
      x: props.x || 0,
      y: props.y || 0
    }
  }

  removeMask() {
    this.props.remove();
  }

  componentDidMount() {
    this.draggable();
  }

  draggable() {
    let onDrag = (event) => {
      console.log('onDrag: ', this);

      let target = event.target,
        x = this.state.x + event.dx,
        y = this.state.y + event.dy;

      this.setState({
        x: x,
        y: y
      });
    }

    let onResizeMove = (event) => {

      let target = event.target,
        x = this.state.x,
        y = this.state.y;

      x += event.deltaRect.left;
      y += event.deltaRect.top;

      this.setState({
        w: event.rect.width,
        h: event.rect.height,
        x: x,
        y: y
      });
    }

    var d = interact(this.rootNode)
      .draggable({
        onmove: onDrag
      })
      .resizable({
        preserveAspectRatio: false,
        edges: { left: true, right: true, bottom: true, top: true }
      })
      .on('resizemove', onResizeMove);
  }

  render() {

    const bgStyle = {
      borderRadius: '3px',
      backgroundColor: 'rgba(0,0,0,0.29)',
      width: '100%',
      height: '100%'
    }

    const buttonStyle = {
      position: 'absolute',
      right: '5px',
      top: '5px',
      padding: '0',
      border: '0',
      margin: '0',
      width: 15,
      height: 15,
      zIndex: 1001
    }

    const iconStyle = {
      width: 15,
      height: 15
    }

    const mainStyle = {
      position: 'absolute',
      width: this.state.w,
      height: this.state.h,
      left: this.state.x,
      top: this.state.y,
      zIndex: 1000
    }

    return <MuiThemeProvider>
      <div ref={(n) => { this.rootNode = n; } }
        style={mainStyle}>
        <IconButton
          iconStyle={iconStyle}
          style={buttonStyle}
          onClick={this.removeMask.bind(this)}><Close /></IconButton>
        <div style={bgStyle} />
      </div >
    </MuiThemeProvider>;
  }
}