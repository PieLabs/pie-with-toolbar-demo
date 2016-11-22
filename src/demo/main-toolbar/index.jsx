import React from 'react';
import ReactDOM from 'react-dom';
import ContentCreate from 'material-ui/svg-icons/content/create';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton'
import Back from 'material-ui/svg-icons/navigation/arrow-back';
import Forward from 'material-ui/svg-icons/navigation/arrow-forward';
import Save from 'material-ui/svg-icons/content/save';
import Pause from 'material-ui/svg-icons/av/pause-circle-outline';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import ZoomOut from 'material-ui/svg-icons/action/zoom-out';
import BrandingWatermark from 'material-ui/svg-icons/av/branding-watermark';

export default class DemoMainToolbar extends HTMLElement {

  constructor() {
    super();
    let sr = this.attachShadow({ mode: 'open' });
    let re = React.createElement(_MainToolbar, {
      onZoomIn: () => {
        let z = document.body.style.zoom || 1;
        document.body.style.zoom = parseFloat(z) + 0.1;
      },
      onZoomOut: () => {
        let z = document.body.style.zoom || 1;
        document.body.style.zoom =  parseFloat(z) - 0.1;
    }});
    ReactDOM.render(re, sr);
  }
}

class _MainToolbar extends React.Component {

  render() {
    return <MuiThemeProvider>
      <div style={{width: '100%'}}>
        <IconButton><Back /></IconButton>
        <IconButton><Forward /></IconButton>
        <IconButton><Save /></IconButton>
        <IconButton><Pause /></IconButton>
        <span style={{float: 'right'}}>
          <IconButton><BrandingWatermark /></IconButton>
          <IconButton onClick={this.props.onZoomIn}><ZoomIn/></IconButton>
          <IconButton onClick={this.props.onZoomOut}><ZoomOut /></IconButton>
        </span>
      </div>
    </MuiThemeProvider>;
  }
}