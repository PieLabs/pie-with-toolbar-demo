import React from 'react';
import ReactDOM from 'react-dom';
import ContentCreate from 'material-ui/svg-icons/content/create';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import tapEventPlugin from 'react-tap-event-plugin';

export class Icon extends React.Component {
  render() {
    return <MuiThemeProvider>
      <IconButton tooltip="Launch notepad" disabled={this.props.disabled}>
        <ContentCreate />
      </IconButton>
    </MuiThemeProvider>
  }
}