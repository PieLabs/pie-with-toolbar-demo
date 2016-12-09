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
import ViewComfy from 'material-ui/svg-icons/image/view-comfy';
import BrandingWatermark from 'material-ui/svg-icons/av/branding-watermark';
import { ToolbarSeparator } from 'material-ui/Toolbar';
import SelectField from 'material-ui/SelectField';
import map from 'lodash/map';
import MenuItem from 'material-ui/MenuItem';
import tapEventPlugin from 'react-tap-event-plugin';

export default class DemoMainToolbar extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  _render() {
    //TODO: this needs to be called - but you're only supposed to call it once for an app.
    //My suspicion is because we have multiple react bundles .. each bundle needs to be initialised.
    //Once we move to externals this won't be required.
    try {
      tapEventPlugin();
      console.log('tapEventPlugin succeeded.');
    } catch (e) {
      console.log('tapEventPlugin failed.');
    }

    let re = React.createElement(_MainToolbar, {
      toggleMasking: (enabled) => {
        console.log('[toggleMasking]: ', enabled);
        this.dispatchEvent(new CustomEvent('masking', {
          bubbles: true,
          detail: {
            enabled: enabled
          }
        }))
      },
      onChange: (key, value) => {
        console.log('onChange: ', arguments);

        if (key === 'view') {
          this._env.mode = value;
        } else {
          this._env[key] = value;
        }

        this.dispatchEvent(new CustomEvent('envChanged', {
          bubbles: true, composed: true, detail: {
            env: this._env
          }
        }));
      },
      onZoomIn: () => {
        let z = document.body.style.zoom || 1;
        document.body.style.zoom = parseFloat(z) + 0.1;
      },
      onZoomOut: () => {
        let z = document.body.style.zoom || 1;
        document.body.style.zoom = parseFloat(z) - 0.1;
      },
      onLaunchCalculator: () => {
        let event = new CustomEvent('launch-calculator', { bubbles: true });
        this.dispatchEvent(event);
      }
    });

    ReactDOM.render(re, this.shadowRoot);
  }

  connectedCallback() {
    // this.dispatchEvent(new CustomEvent('pie.env-requested', { bubbles: true, composed: true }));
    this._render();
  }
}

class _MainToolbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      view: this.props.view || 'gather',
      lang: this.props.lang || 'en-US',
      colorContrast: this.props.colorContrast || 'black_on_white',
      maskingEnabled: false
    };
  }

  toggleMasking() {
    this.setState({ maskingEnabled: !this.state.maskingEnabled }, () => {
      this.props.toggleMasking(this.state.maskingEnabled);
    });
  }


  render() {
    return <MuiThemeProvider>
      <div style={{ width: '100%' }}>

        <span style={{ float: 'right' }}>
          <IconButton
            onClick={this.props.onLaunchCalculator}><ViewComfy /></IconButton>
          <IconButton
            iconStyle={this.state.maskingEnabled ? { color: 'lightblue' } : {}}
            onClick={this.toggleMasking.bind(this)}>
            <BrandingWatermark />
          </IconButton>
          <IconButton onClick={this.props.onZoomIn}><ZoomIn /></IconButton>
          <IconButton onClick={this.props.onZoomOut}><ZoomOut /></IconButton>
        </span>
      </div>
    </MuiThemeProvider>;
  }
}

export class ChoiceGroup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  getStyle() {
    return {
      'paddingLeft': '10px',
      'paddingRight': '10px',
    }
  }

  render() {
    return <SelectField
      floatingLabelText={this.props.label}
      value={this.props.value}
      onChange={this.props.onChange} >
      {map(this.props.options, (o) => {
        return <MenuItem key={o} value={o} primaryText={o} />
      })}
    </SelectField>;
  }
}