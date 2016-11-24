import React from 'react';
import ReactDOM from 'react-dom';
import Play from 'material-ui/svg-icons/av/play-circle-outline';
import Stop from 'material-ui/svg-icons/av/stop';
import Pause from 'material-ui/svg-icons/av/pause-circle-outline';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';

export default class TextToSpeechButton extends HTMLElement{

  constructor(){
    super();
    let sr = this.attachShadow({mode: 'open'});
    sr.innerHTML = `

    `;

    this._player = new Player();
  }

  set target(n){
    this._target = n;
    this._render();
    this._player.text = this._target.textContent;
  }

  _render(){
    if(!this._target){
      return;
    }

    let content = this._target.textContent;

    content = content.substring(0, 10);

    let re = React.createElement(_Button, {
      player: this._player 
    });
    ReactDOM.render(re, this.shadowRoot);
  }

}


class Player {

  constructor(text){
    this._text = text;
  }

  set text(t){
    this._text = t;
  }

  play(done){

    if(!this._text){
      done();
      return;
    }

    if(!this._msg){
      let trimmed = this._text.trim();
      /** 
       * TODO: we're trimming the text for now
       * but may want to use something like this: 
       * https://gist.github.com/woollsta/2d146f13878a301b36d7#file-chunkify-js
       */
      trimmed = trimmed.substring(0, 200);
      let msg = new SpeechSynthesisUtterance();
      var voices = window.speechSynthesis.getVoices();
      msg.voice = voices[10]; // Note: some voices don't support altering params
      msg.voiceURI = 'native';
      msg.volume = 1; 
      msg.rate = 1; 
      msg.pitch = 1; 
      msg.text = trimmed; 
      msg.lang = 'en-US';

      msg.onerror = function(err){
        console.error(err);
        done();
      }

      msg.onend = (e) => {
        this._msg = null;
        done();
      };
      
      window.speechSynthesis.speak(msg);
      this._msg = msg;
    } else {
      window.speechSynthesis.resume();
    }
  }

  pause(){
    console.log('[Player] pause');
    window.speechSynthesis.pause();
  }

  stop(){
    console.log('[Player] stop');
    window.speechSynthesis.cancel();
    this._msg = null;
  }
}


class _Button extends React.Component{


  constructor(props){
    super(props);
    this.state = {
      current: this.props.state || 'stopped'
    }
  }

  get _player(){
    return this.props.player;
  }
  
  stop(){
    this.setState({current: 'stopped'});
    this._player.stop();
  }

  play(){
    this.setState({current: 'playing'});
    this._player.play(() => {
      this.setState({current: 'stopped'});
    });
  }

  pause() {
    this.setState({current: 'paused'});
    this._player.pause();
  }
  
  render(){

    const current = this.state.current; 
    const Button = current === 'playing' ? Pause : Play; 

    return <MuiThemeProvider>
      <span>
        <IconButton 
          tooltip={current === 'stopped' ? null : 'stop'} 
          onClick={this.stop.bind(this)} 
          disabled={current === 'stopped'}>
          <Stop/>
        </IconButton>
        <IconButton tooltip={current === 'playing' ?  'pause' : 'play text'} 
          onClick={ current === 'playing' ? this.pause.bind(this) : this.play.bind(this)}>
          <Button/>
        </IconButton>
      </span>
    </MuiThemeProvider>;
  }
}