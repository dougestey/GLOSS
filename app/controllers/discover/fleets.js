import Controller, { inject as controller } from '@ember/controller';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';

export default Controller.extend({

  discover: controller(),

  discovery: service(),

  fleets: reads('discovery.fleets.[]'),

  fleetsLoaded: reads('discovery.loaded'),

  actions: {
    selectFleet(fleet) {
      this.get('discover').send('selectFleet', fleet);
    },

    toggleTracking(fleet) {
      this.get('discover').send('toggleTracking', fleet);
    },
  }

});
