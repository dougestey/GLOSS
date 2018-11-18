import Controller, { inject as controller } from '@ember/controller';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';

export default Controller.extend({

  discover: controller(),

  discovery: service(),

  fleets: reads('discovery.fleets.[]'),

  fleetsLoaded: reads('discovery.initialized'),

  actions: {
    selectFleet(id) {
      this.get('discover').send('selectFleet', id);
    },

    toggleTracking() {
      this.get('discover').send('toggleTracking');
    },
  }

});
