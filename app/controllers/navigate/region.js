import Controller, { inject as controller } from '@ember/controller';
import { reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Controller.extend({

  navigate: controller(),

  intel: service(),

  fleets: reads('intel.region.fleets.[]'),

  actions: {
    selectThreat(threat) {
      this.get('navigate').send('selectThreat', threat);
    },

    trackThreat(threat) {
      this.get('navigate').send('trackThreat', threat);
    },

    untrackThreat(threat) {
      this.get('navigate').send('untrackThreat', threat);
    }
  }

});
