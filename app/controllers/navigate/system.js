import Controller, { inject as controller } from '@ember/controller';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';

export default Controller.extend({

  navigate: controller(),

  intel: service(),

  location: service(),

  system: reads('location.system.id'),

  fleets: reads('intel.fleets.system.[]'),

  actions: {
    selectFleet(fleet) {
      this.get('navigate').send('selectFleet', fleet);
    },

    toggleTracking(fleet) {
      this.get('navigate').send('toggleTracking', fleet);
    },
  }

});
