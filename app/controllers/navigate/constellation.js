import Controller, { inject as controller } from '@ember/controller';
import { reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Controller.extend({

  navigate: controller(),

  intel: service(),

  location: service(),

  system: reads('location.system.id'),

  fleets: reads('intel.fleets.constellation.[]'),

  actions: {
    selectFleet(id) {
      this.get('navigate').send('selectFleet', id);
    },

    toggleTracking() {
      this.get('navigate').send('toggleTracking');
    },
  }

});
