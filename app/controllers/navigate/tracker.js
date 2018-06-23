import Controller, { inject as controller } from '@ember/controller';
import { reads, filterBy } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Controller.extend({

  navigate: controller(),

  tracker: service(),

  location: service(),

  system: reads('location.system.id'),

  fleets: reads('tracker.fleets.[]'),

  activeFleets: filterBy('fleets', 'isActive', true),

  inactiveFleets: filterBy('fleets', 'isActive', false),

  actions: {
    selectFleet(fleet) {
      this.get('navigate').send('selectFleet', fleet);
    },

    toggleTracking(fleet) {
      this.get('navigate').send('toggleTracking', fleet);
    },
  }

});
