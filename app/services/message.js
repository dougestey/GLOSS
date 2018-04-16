import Service from '@ember/service';
import { computed } from '@ember/object';
import { later } from '@ember/runloop';

export default Service.extend({

  dispatch(header, subheader, seconds, shouldNotOverlay) {
    this.setProperties({
      header,
      subheader,
      isShowingMessage: true,
      shouldNotOverlay
    });

    if (seconds)
      later(() => this.set('isShowingMessage', false), seconds * 1000);
  }

});
