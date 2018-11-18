import Controller, { inject as controller } from '@ember/controller';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Controller.extend({

  navigate: controller(),

  discovery: service(),

  location: service(),

  system: reads('location.system.id'),

  region: reads('location.region.id'),

  fleets: reads('navigate.nearbyFleets'),

  actions: {
    selectFleet(id) {
      this.get('navigate').send('selectFleet', id);
    },

    toggleTracking() {
      this.get('navigate').send('toggleTracking');
    },
  }

});
