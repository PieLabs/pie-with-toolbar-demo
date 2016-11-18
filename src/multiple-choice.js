import TutorialLauncher from './tutorial-launcher';
import ToolbarContributionEvent from './events/toolbar-contribution';

export default class MultipleChoice extends HTMLElement {

  constructor() {
    super();
    this.tutorialLauncher = new TutorialLauncher();
    this.strikeThroughEnabled = false;
  }

  toggleStrikeThrough(enabled) {
    this.strikeThroughEnabled = !this.strikeThroughEnabled;
    console.log('this.strikeThroughEnabled: ', this.strikeThroughEnabled);
  }

  connectedCallback() {

    let tutorial = {
      icon: 'tutorial',
      handler: () => this.tutorialLauncher.launch('path/to/toolbar/tutorial')
    }

    let strikeThrough = {
      icon: 'strikethrough',
      handler: this.toggleStrikeThrough
    }

    this.dispatchEvent(new ToolbarContributionEvent([
      tutorial,
      strikeThrough
    ]
    ));

    this.innerHTML = 'mc!';
  }
}