import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { later } from '@ember/runloop';

export default Controller.extend({

  location: service(),

  notifications: service(),

  character: computed.reads('location.character'),

  system: computed.reads('location.system'),

  stream: computed.reads('notifications.latest.[]'),

  threats: computed.reads('notifications.fleets.[]'),

  init() {
    this._super(...arguments);

    later(() => {
      this.set('loadUiElements', true);
    }, 500);

    this.get('notifications').enable();
  }

});
