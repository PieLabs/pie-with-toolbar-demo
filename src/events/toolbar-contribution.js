const EVENT_TYPE = 'toolbar-contribution';

export default class ToolbarContributionEvent extends CustomEvent {

  constructor(capabilities) {

    if(!capabilities){
      throw new Error('capabilities can not be undefined')
    }
    
    capabilities = Array.isArray(capabilities) ? capabilities : [capabilities];

    super(EVENT_TYPE, {
      bubbles: true,
      detail: {
        capabilities: capabilities 
      }
    });
  }
}

ToolbarContributionEvent.eventType = EVENT_TYPE;