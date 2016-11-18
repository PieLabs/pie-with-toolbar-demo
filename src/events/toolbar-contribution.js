const EVENT_TYPE = 'toolbar-contribution';

export default class ToolbarContributionEvent extends CustomEvent {

  constructor(actions) {
    super(EVENT_TYPE, {
      bubbles: true,
      detail: {
        actions: actions
      }
    });
  }
}

ToolbarContributionEvent.eventType = EVENT_TYPE;