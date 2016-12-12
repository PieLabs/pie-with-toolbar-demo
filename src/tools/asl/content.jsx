import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton'
import Close from 'material-ui/svg-icons/navigation/close';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import AslToggleEvent from '../../events/asl-toggle';
import HTMLElementWithEvents from './html-element-with-events';

export default class ASLContent extends HTMLElementWithEvents {

  constructor() {
    super();
    this._src = this.attributes['src'].nodeValue;
    this._render();
  }

  connectedCallback() {
    document.addEventListener(AslToggleEvent.eventType, (event) => {
      if (event.detail.src == this._src) {
        event.preventDefault();
        event.stopImmediatePropagation();
        this.element.toggle();
      }
    }, true);
  }

  _render() {
    this.element = ReactDOM.render(React.createElement(_Content, {src: this._src}), this);
    this.retargetEvents();
  }

}

class _Content extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showContent: false
    };
  }

  toggle() {
    this.setState({
      showContent: !this.state.showContent
    });
  }

  close() {
    this.setState({
      showContent: false
    });
  }

  render() {
    const style = {
      padding: 20,
      display: 'inline-block'
    };

    const headerStyle = {
      padding: 0,
      textAlign: 'right'
    };

    let video = <MuiThemeProvider>
      <Card style={style}>
        <CardHeader style={headerStyle}>
          <IconButton onClick={this.close.bind(this)}><Close /></IconButton>
        </CardHeader>
        <CardText>
          <video controls>
            <source src={this.props.src} type="video/webm"/>
          </video>
        </CardText>
      </Card>
    </MuiThemeProvider>;

    let empty = <div></div>;
    
    return this.state.showContent ? video : empty;
  }

}