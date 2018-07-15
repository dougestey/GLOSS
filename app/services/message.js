import Service from '@ember/service';
import { later } from '@ember/runloop';
import { task } from 'ember-concurrency';

export default Service.extend({

  dispatch: task(function * (header, subheader, seconds, shouldNotOverlay) {
    this.setProperties({
      header,
      subheader,
      isShowingMessage: true,
      shouldNotOverlay
    });

    if (seconds)
      later(() => this.set('isShowingMessage', false), seconds * 1000);
  }).drop(),

  clear() {
    this.set('isShowingMessage', false);
  }

});
