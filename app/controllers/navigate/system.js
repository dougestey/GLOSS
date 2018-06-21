import Controller, { inject as controller } from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({

  navigate: controller(),

  intel: service(),

  fleets: reads('intel.fleets.system.[]'),

  actions: {
    selectThreat() {
      this.get('navigate').send('selectThreat');
    },

    trackThreat() {
      this.get('navigate').send('trackThreat');
    },

    untrackThreat() {
      this.get('navigate').send('untrackThreat');
    }
  }

});
