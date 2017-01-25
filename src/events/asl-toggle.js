const EVENT_TYPE = 'asl-toggle';

export default class AslToggle extends CustomEvent {

  constructor(src, show) {

    if (!src) {
      throw new Error('src can not be undefined')
    }

    super(EVENT_TYPE, {
      bubbles: true,
      composed: true,
      detail: {
        src: src,
        show: show
      }
    });
  }
}

AslToggle.TYPE = EVENT_TYPE;