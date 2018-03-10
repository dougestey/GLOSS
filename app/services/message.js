import Service from '@ember/service';
import { computed } from '@ember/object';
import { later } from '@ember/runloop';

export default Service.extend({

  dispatch(header, subheader, seconds) {
    this.setProperties({
      header,
      subheader,
      isShowingMessage: true
    });

    if (seconds)
      later(() => this.set('isShowingMessage', false), seconds * 1000);
  }

});
