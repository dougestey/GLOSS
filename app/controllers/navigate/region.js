import Controller, { inject as controller } from '@ember/controller';
import { reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Controller.extend({

  navigate: controller(),

  intel: service(),

  location: service(),

  system: reads('location.system.id'),

  fleets: reads('intel.fleets.region.[]'),

  actions: {
    selectFleet(fleet) {
      this.get('navigate').send('selectFleet', fleet);
    },

    toggleTracking(fleet) {
      this.get('navigate').send('toggleTracking', fleet);
    },
  }

});
