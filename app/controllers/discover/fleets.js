import Controller, { inject as controller } from '@ember/controller';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';

export default Controller.extend({

  navigate: controller(),

  discovery: service(),

  // intel: service(),

  fleets: reads('discovery.fleets.[]'),

  init() {
    this._super(...arguments);

    this.get('discovery').enable();
  },

  actions: {
    selectFleet(fleet) {
      this.get('navigate').send('selectFleet', fleet);
    },

    toggleTracking(fleet) {
      this.get('navigate').send('toggleTracking', fleet);
    },
  }

});
